<?
//------------------------------------------------------------------//
//                                                                  //
// Пишите код так, как будто сопровождать его будет склонный к      //
// насилию психопат, который знает, где вы живёте.                  //
//                                                                  //
//------------------------------------------------------------------//

/**
 * Основной индексный файл
 */

define ('PCL_OK', 1);

//------------------------------------------------------------------
// Инициализация скрипта
//------------------------------------------------------------------

// Определение корневой папки размещения скриптов
define ('ROOT_DIR',dirname(__FILE__).DIRECTORY_SEPARATOR);

include ROOT_DIR.'config.php';
include ROOT_DIR.'main'.DIRECTORY_SEPARATOR.'main_function.php';

$core=core::init();

$core->set_error_break(true);
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

$q="SET SQL_BIG_SELECTS=1";
$db->query($q);

$q="SET GROUP_CONCAT_MAX_LEN = 54096";
$db->query($q);

$q="SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED";
$db->query($q);

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

// Подключить парсер шаблонов
$overall = new parser (ROOT_DIR.'templates');
$overall->set_template('main_overall.html');

// Установить глобальные переменные-заместители
$overall->assign_global(array(
    'HTML_ROOT'=>HTML_ROOT,
    // 'CSSVER'=>dechex(crc32(filemtime(ROOT_DIR.'styles.css'))),
    // 'JSVER'=>dechex(crc32(filemtime(ROOT_DIR.'javascript.js'))),
    'FAVVER'=>dechex(crc32(filemtime(ROOT_DIR.'favicon.ico'))),
));

// Подключить обработчик контента
$content=new content();

$content->add_meta('title','Личный кабинет');

// Определение запрошенной страницы
if (isset($_GET['page'])) {
    $page=$_GET['page'];
    if (!preg_match('/^[_a-z0-9]{2,}$/',$page)) {
        $page='index';
    }
}
else {
    $page='index';
}

// Запрещенные страницы
if (in_array($page, array('function', 'flats_common', 'data_processing'))) {
    $page='index';
}

$html='';
$action=isset($_GET['action'])?trim($_GET['action']):'';

if (PERMISSION) {
    if (!isset($_COOKIE['logged'])) {
        write_log('Вход в систему');
        SetCookie('logged',1,0,'/', '.'.getenv('HTTP_HOST'));
    }

    if (!file_exists(ROOT_DIR.'main'.DIRECTORY_SEPARATOR.'main_'.$page.'.php')) {
        // Страница не найдена
        $page='404';
    }

    // Подключить страницу
    include ROOT_DIR.'main'.DIRECTORY_SEPARATOR.'main_'.$page.'.php';

    $overall->parse_block('overall',array(
        'CONTENT'=>$html
    ), true);

    $overall->parse_block('yes_logged',array(
        'TITLE_TEXT'=>$content->get_meta('title'),
    ), true);
}
else {
    if ($page!='login') {
        $overall->parse_block('not_logged',array(
            'TITLE_TEXT'=>$content->get_meta('title'),
        ), true);
    }
    else {
        // Подключить страницу
        include ROOT_DIR.'main'.DIRECTORY_SEPARATOR.'main_login.php';
        exit;
    }
}

//------------------------------------------------------------------
// Вывод страницы
//------------------------------------------------------------------
$content->add_content(
    $overall->parse_template(array(
    ), true)
);

if ($page!='404' && $page!='403') {
    $content->add_header('HTTP/1.1 200 OK');
}
$content->add_header('Content-type: text/html; charset=utf-8');

$content->write();

$q="SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ";
$db->query($q);

$db->close();
