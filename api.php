<?
/**
 * АПИ
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

ini_set('max_execution_time', '30000');

define ('PCL_OK', 1);

//------------------------------------------------------------------
// Инициализация скрипта
//------------------------------------------------------------------

// Время начала генерации страницы
$mtime=explode(' ',microtime());
$tstart=$mtime[1]+$mtime[0];

// Определение корневой папки размещения скриптов
define ('ROOT_DIR',dirname(__FILE__).DIRECTORY_SEPARATOR);

// Установить кодировку системы
setlocale(LC_ALL, 'ru_RU.CP1251');

// Установить временную зону системы
if (function_exists('date_default_timezone_set')) {
    date_default_timezone_set('Europe/Moscow');
}

// Старт сессии
include ROOT_DIR.'config.php';
include ROOT_DIR.'main'.DIRECTORY_SEPARATOR.'main_function.php';

$core=core::init();

$core->set_error_break(false);
$core->set_error_display(true);

// Работа с базой данных
$db=new mysql(MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_BASE, 'utf8', array(
    'mysql_max_allowed_time' => 5.00,
    'mysql_global_log' => false,
    'mysql_slow_log' => true,
    'mysql_error_log' => true,
    'mysql_prefix' => MYSQL_PREFIX
));
$db->set_error_break(true);

// Настройки сайта
$q="SELECT * FROM `@_settings`";
$db->query($q);
$_SETTINGS=array();
while ($tmp=$db->fetch_array()) {
    $_SETTINGS[$tmp['setting_name']]=$tmp['setting_value'];
}


$login=isset($_COOKIE['login'])?$_COOKIE['login']:'';
$password=isset($_COOKIE['password'])?$_COOKIE['password']:'';

$q="SELECT `@_users`.*, `@_clients`.*
    , GROUP_CONCAT(DISTINCT `mtype_text` SEPARATOR ',') AS `user_subscribe`
    , GROUP_CONCAT(DISTINCT `right_text` SEPARATOR ',') AS `user_rights`
    , GROUP_CONCAT(DISTINCT `uc_complex` SEPARATOR ',') AS `user_complex_ignore`
    , GROUP_CONCAT(DISTINCT CONCAT(`uc_complex`,'_',`uc_client`) SEPARATOR ',') AS `user_total_ignore`
    , GROUP_CONCAT(DISTINCT `uc_campaign` SEPARATOR ',') AS `user_campaign_ignore`
    , GROUP_CONCAT(DISTINCT `us_sale` SEPARATOR ',') AS `user_sale_ignore`
FROM `@_users`
    LEFT JOIN (`@_users_mtypes`, `@_mtypes`) ON
        (`um_user_id`=`user_id` AND `um_mtype_id`=`mtype_id`)
    LEFT JOIN (`@_users_rights`, `@_rights`) ON
        (`ur_user_id`=`user_id` AND `ur_right_id`=`right_id`)
    LEFT JOIN `@_user_complex` ON `@_user_complex`.`uc_user`=`user_id`
    LEFT JOIN `@_user_campaign` ON `@_user_campaign`.`uc_user`=`user_id`
    LEFT JOIN `@_user_sale` ON `us_user`=`user_id`
    LEFT JOIN `@_clients` ON `user_client`=`client_id`
WHERE
`user_login`='".$db->escape($login)."'
AND `user_password`='".$db->escape($password)."'
AND `user_active`='1'
LIMIT 1";

$db->query($q);
if ($db->num_rows()) {
    $user=$db->fetch_array();

    // MGCom
    // WPVTIMHQM

    // core::pre($user);
    // exit;

    $tmp_client=isset($_COOKIE['tmp_client'])?intval($_COOKIE['tmp_client']):0;
    $tmp_group=isset($_COOKIE['tmp_group'])?trim($_COOKIE['tmp_group']):'';
    $tmp_key=isset($_COOKIE['tmp_key'])?trim($_COOKIE['tmp_key']):'';

    if ($tmp_key==md5('KILL'.$tmp_group.md5($user['user_id'].'FUCK!'.$tmp_client))) {
        $q="SELECT * FROM `@_clients` WHERE `client_id`='".$db->escape($tmp_client)."' LIMIT 1";
        $db->query($q);
        $tmp=$db->fetch_array();

        // Название клиента для публикации
        if ($tmp['client_real_name']!='') {
            $tmp['client_name']=$tmp['client_real_name'];
        }

        $user['user_client']=$tmp_client;
        $user=array_merge($user,$tmp);

        if ($tmp_group=='moderator') {
            $user['user_group']=2;
        }
        elseif ($tmp_group=='user') {
            $user['user_group']=3;
        }
        define('FAKE',1);
    }
    $ADMIN_NAME=$user['user_name'];
    $CLIENTX_NAME=$user['client_name'];
    $USER_NOTIFY=explode(',',$user['user_subscribe']);
    $USER_RIGHTS=explode(',',$user['user_rights']);

    if (in_array('spam', $USER_RIGHTS)) {
        define('PERMISSION',0);
    }
    else {
        define('PERMISSION',$user['user_group']);
    }

    // Все связанные клиенты за исключением Агентства
    $TOTAL_CLIENTS=array($user['user_client']);
    $q="SELECT * FROM `@_clients`
        WHERE
        `client_parent`='".$db->escape($user['user_client'])."'
        AND `client_id`!=256
    ";
    $db->query($q);
    while($tmp=$db->fetch_array()) {
        $TOTAL_CLIENTS[]=$tmp['client_id'];
    }
    $TOTAL_CLIENTS=array_unique($TOTAL_CLIENTS);
}
else {
    define('PERMISSION',0);
    $ADMIN_NAME='';
    $CLIENTX_NAME='';
    $USER_NOTIFY=array();
    $USER_RIGHTS=array();
    $TOTAL_CLIENTS=array();
    $user=array();
}

// операторам доступа к нам нет
if (in_array('spam', $USER_RIGHTS)) {
    $ADMIN_NAME='';
    $CLIENTX_NAME='';
    $USER_NOTIFY=array();
    $USER_RIGHTS=array();
    $TOTAL_CLIENTS=array();
    $user=array();
}

// Определение запрошенной страницы
if (isset($_GET['page'])) {
    $page=$_GET['page'];
    if (!preg_match('/^[_a-z0-9]{2,}$/',$page)) {
        $page='';
    }
}
else {
    $page='';
}

if (PERMISSION) {
    // АПИ
    $file_name='api_'.$page.'.php';

    // Ни один файл АПИ не найден
    if (!file_exists(ROOT_DIR.'main'.DIRECTORY_SEPARATOR.$file_name)) {
        $result=array(
            'result'=>'error',
            'message'=>'Unknown API call',
        );
    }
    else {
        // Подключить файл АПИ
        include ROOT_DIR.'main'.DIRECTORY_SEPARATOR.$file_name;
    }
}
else {
    $result=array(
        'result'=>'error',
        'message'=>'Not authorized',
    );
}

$db->close();

Header('Content-type: application/json');
echo json_encode($result);
