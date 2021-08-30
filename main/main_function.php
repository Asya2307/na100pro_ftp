<?
/**
 * Дополнительные функции
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

// Автозагрузка классов
function __autoload($class_name) {
    if (preg_match('/^[a-z][0-9a-z_]+$/is',$class_name) && defined('ROOT_DIR')) {
        if (file_exists(ROOT_DIR.'..'.DIRECTORY_SEPARATOR.'main'.DIRECTORY_SEPARATOR.'class.'.$class_name.'.php')) {
            include_once(ROOT_DIR.'..'.DIRECTORY_SEPARATOR.'main'.DIRECTORY_SEPARATOR.'class.'.$class_name.'.php');
        }
        else {
            throw new Exception('Class '.$class_name.' not found ');
        }
    }
    else {
        throw new Exception('Incorrect path to include ');
    }
}
if (function_exists('spl_autoload_register')) {
    spl_autoload_register('__autoload');
}

// Очистка ввода
function clean_input($a) {
    $tmp=explode('.',PHP_VERSION);
    foreach($a as $key=>$v) {
        if (is_array($v)) {
            $a[$key]=clean_input($v);
        }
        else {
            $a[$key]=(intval($tmp[0])>5 || ($tmp[0]=='5' && intval($tmp[1]>=3)))?stripslashes($v):$v;
        }
    }
    return $a;
}
$_POST=clean_input($_POST);
$_COOKIE=clean_input($_COOKIE);

//----------------------------------------------------------------------
// Запись данных в лог-таблицу
//----------------------------------------------------------------------
function write_log($action='', $user_name='') {
    global $db, $user;

    if ($action=='') { return false; }

    if ($user_name=='') {
        if (isset($user['user_login'])) {
            $user_name=$user['user_login'];
        }
        else {
            $user_name='---';
        }
    }

    $user_agent=getenv('HTTP_USER_AGENT');
    if ($user_agent=='') {
        $ip=getenv('REMOTE_ADDR');
        $host=gethostbyaddr($ip);
        if ($ip!=$host) {
            $user_agent=$ip.' - '.$host;
        }
        else {
            $user_agent=$ip;
        }
    }

    $q="INSERT INTO `@_log` SET
        `log_date`='".$db->escape(time())."',
        `log_ip`='".$db->escape(getenv('REMOTE_ADDR'))."',
        `log_agent`='".$db->escape($user_agent)."',
        `log_user`='".$db->escape($user_name)."',
        `log_action`='".$db->escape($action)."'
    ";
    $db->query($q, 'log');
    return true;
}

//-------------------------------------------------------------------
// Разбивка числа группами по 3 цифры
//-------------------------------------------------------------------
function split_num($str) {
    if (substr($str,0,1)=='-') {
        $res='-'.split_num(abs($str));
    }
    else {
        $res='';
        if (preg_match('/^\d{1,}$/i',$str)) {
            while (strlen($str)>3) {
                $res=','.substr($str,strlen($str)-3).$res;
                $str=substr($str,0,strlen($str)-3);
            }
        }
        $res=$str.$res;
    }
    return ($res);
}

//----------------------------------------------------------------------
// Автоматическая генерация заголовка объявления
//----------------------------------------------------------------------
function generate_head($rooms, $complex, $fix_size=true, $studio=false, $apart=false, $renew=false, $own=0, $flat_new='?') {
    do {
        $rand=rand(0,100);

        $rand2=rand(0,100);

        // Апартаменты
        if ($apart) {
            switch($rooms) {
                case 1: {
                    if ($rand2<40) {
                        $name='Однокомнатные апартаменты';
                    }
                    else {
                        $name='1-комн. апартаменты';
                    }
                    if ($studio) {
                        $name.='-студия';
                    }
                    break;
                }
                case 2: {
                    if ($rand2<40) {
                        $name='Двухкомнатные апартаменты';
                    }
                    else {
                        $name='2-комн. апартаменты';
                    }
                    if ($studio) {
                        $name.=' с европланировкой';
                    }
                    break;
                }
                case 3: {
                    if ($rand2<40) {
                        $name='Трехкомнатные апартаменты';
                    }
                    else {
                        $name='3-комн. апартаменты';
                    }
                    if ($studio) {
                        $name.=' с европланировкой';
                    }
                    break;
                }
                default: {
                    if ($rand2<40) {
                        $name='Апартаменты';
                    }
                    else {
                        $name=$rooms.'-комн. апартаменты';
                    }
                    if ($studio) {
                        $name.='-студия';
                    }
                    break;
                }
            }

            // Переуступка прав
            if ($own) {
                if ($rand<15) {
                    $head='Просторные '.mb_strtolower($name,'utf-8');
                }
                elseif ($rand<30) {
                    if ($fix_size) {
                        $head='Продаются '.mb_strtolower($name,'utf-8').' в '.$complex;
                    }
                    else {
                        $head='Продаются '.mb_strtolower($name,'utf-8');
                    }
                }
                elseif ($rand<50) {
                    if ($fix_size) {
                        $head=$name.' в '.$complex;
                    }
                    else {
                        $head=$name;
                    }
                }
                elseif ($rand<85) {
                    $head=$name;
                }
                else {
                    $head='Продаются '.mb_strtolower($name,'utf-8');
                }
            }
            else {
                // реновация
                if ($renew) {
                    if ($rand<10) {
                        $head='Просторные '.mb_strtolower($name,'utf-8');
                    }
                    elseif ($rand<20) {
                        $head=$name.' от застройщика';
                    }
                    elseif ($rand<30) {
                        $head='Продаются '.mb_strtolower($name,'utf-8').' от застройщика';
                    }
                    elseif ($rand<40) {
                        $head='Продаются '.mb_strtolower($name,'utf-8');
                    }
                    elseif ($rand<70) {
                        $head=$name;
                    }
                    elseif ($rand<80) {
                        $head='Просторные '.mb_strtolower($name,'utf-8');
                    }
                    elseif ($rand<90) {
                        if ($fix_size) {
                            $head='Продаются '.mb_strtolower($name,'utf-8').' в '.$complex;
                        }
                        else {
                            $head='Продаются '.mb_strtolower($name,'utf-8');
                        }
                    }
                    else {
                        if ($fix_size) {
                            $head=$name.' от застройщика в '.$complex;
                        }
                        else {
                            $head=$name.' от застройщика';
                        }
                    }
                }
                // новостройка
                else {
                    if ($rand<10) {
                        if ($fix_size) {
                            $head='Просторные '.mb_strtolower($name,'utf-8').' в новостройке';
                        }
                        else {
                            $head='Просторные '.mb_strtolower($name,'utf-8');
                        }
                    }
                    elseif ($rand<20) {
                        if ($fix_size) {
                            $head=$name.' в новостройке от застройщика';
                        }
                        else {
                            $head=$name.' от застройщика';
                        }
                    }
                    elseif ($rand<30) {
                        $head='Продаются '.mb_strtolower($name,'utf-8').' от застройщика';
                    }
                    elseif ($rand<40) {
                        if ($fix_size) {
                            $head='Продаются '.mb_strtolower($name,'utf-8').' в новостройке';
                        }
                        else {
                            $head='Продаются '.mb_strtolower($name,'utf-8');
                        }
                    }
                    elseif ($rand<50) {
                        if ($fix_size) {
                            $head=$name.' в новом жилом комплексе';
                        }
                        else {
                            $head=$name;
                        }
                    }
                    elseif ($rand<60) {
                        if ($fix_size) {
                            $head=$name.' в новостройке';
                        }
                        else {
                            $head=$name;
                        }
                    }
                    elseif ($rand<70) {
                        $head=$name;
                        // $head=$name.' по доступной цене. Новостройка';
                    }
                    elseif ($rand<80) {
                        if ($fix_size) {
                            $head='Просторные '.mb_strtolower($name,'utf-8').' в новом ЖК';
                        }
                        else {
                            $head='Просторные '.mb_strtolower($name,'utf-8');
                        }
                    }
                    elseif ($rand<90) {
                        if ($fix_size) {
                            $head='Продаются '.mb_strtolower($name,'utf-8').' в '.$complex;
                        }
                        else {
                            $head='Продаются '.mb_strtolower($name,'utf-8');
                        }
                    }
                    else {
                        if ($fix_size) {
                            $head=$name.' от застройщика в '.$complex;
                        }
                        else {
                            $head=$name.' от застройщика';
                        }
                    }
                }
            }
        }
        // Квартиры
        else {
            switch($rooms) {
                case 1: {
                    if ($rand2<40) {
                        $name='Однокомнатная квартира';
                    }
                    else {
                        $name='1-комн. квартира';
                    }
                    if ($studio) {
                        $name.='-студия';
                    }
                    break;
                }
                case 2: {
                    if ($rand2<40) {
                        $name='Двухкомнатная квартира';
                    }
                    else {
                        $name='2-комн. квартира';
                    }
                    if ($studio) {
                        $name.=' с европланировкой';
                    }
                    break;
                }
                case 3: {
                    if ($rand2<40) {
                        $name='Трехкомнатная квартира';
                    }
                    else {
                        $name='3-комн. квартира';
                    }
                    if ($studio) {
                        $name.=' с европланировкой';
                    }
                    break;
                }
                default: {
                    if ($rand2<40) {
                        $name='Квартира';
                    }
                    else {
                        $name=$rooms.'-комн. квартира';
                    }
                    if ($studio) {
                        if ($rooms==1) {
                            $name.='-студия';
                        }
                        else {
                            $name.=' с европланировкой';
                        }
                    }
                    break;
                }
            }

            // Переуступка прав
            if ($own) {
                if ($rand<15) {
                    $head='Просторная '.mb_strtolower($name,'utf-8');
                }
                elseif ($rand<30) {
                    if ($fix_size) {
                        $head='Продается '.mb_strtolower($name,'utf-8').' в '.$complex;
                    }
                    else {
                        $head='Продается '.mb_strtolower($name,'utf-8');
                    }
                }
                elseif ($rand<50) {
                    if ($fix_size) {
                        $head=$name.' в '.$complex;
                    }
                    else {
                        $head=$name;
                    }
                }
                elseif ($rand<85) {
                    $head=$name;
                }
                else {
                    $head='Продается '.mb_strtolower($name,'utf-8');
                }
            }
            else {
                // реновация
                if ($renew) {
                    if ($rand<10) {
                        $head='Просторная '.mb_strtolower($name,'utf-8');
                    }
                    elseif ($rand<20) {
                        $head=$name.' от застройщика';
                    }
                    elseif ($rand<30) {
                        $head='Продается '.mb_strtolower($name,'utf-8').' от застройщика';
                    }
                    elseif ($rand<40) {
                        $head='Продается '.mb_strtolower($name,'utf-8');
                    }
                    elseif ($rand<70) {
                        $head=$name;
                    }
                    elseif ($rand<80) {
                        $head='Просторная '.mb_strtolower($name,'utf-8');
                    }
                    elseif ($rand<90) {
                        if ($fix_size) {
                            $head='Продается '.mb_strtolower($name,'utf-8').' в '.$complex;
                        }
                        else {
                            $head='Продается '.mb_strtolower($name,'utf-8');
                        }
                    }
                    else {
                        if ($fix_size) {
                            $head=$name.' от застройщика в '.$complex;
                        }
                        else {
                            $head=$name.' от застройщика';
                        }
                    }
                }
                // новостройка
                else {
                    if ($rand<10) {
                        if ($fix_size) {
                            $head='Просторная '.mb_strtolower($name,'utf-8').' в новостройке';
                        }
                        else {
                            $head='Просторная '.mb_strtolower($name,'utf-8');
                        }
                    }
                    elseif ($rand<20) {
                        if ($fix_size) {
                            $head=$name.' в новостройке от застройщика';
                        }
                        else {
                            $head=$name.' от застройщика';
                        }
                    }
                    elseif ($rand<30) {
                        $head='Продается '.mb_strtolower($name,'utf-8').' от застройщика';
                    }
                    elseif ($rand<40) {
                        if ($fix_size) {
                            $head='Продается '.mb_strtolower($name,'utf-8').' в новостройке';
                        }
                        else {
                            $head='Продается '.mb_strtolower($name,'utf-8');
                        }
                    }
                    elseif ($rand<50) {
                        if ($fix_size) {
                            $head=$name.' в новом жилом комплексе';
                        }
                        else {
                            $head=$name;
                        }
                    }
                    elseif ($rand<60) {
                        if ($fix_size) {
                            $head=$name.' в новостройке';
                        }
                        else {
                            $head=$name;
                        }
                    }
                    elseif ($rand<70) {
                        $head=$name;
                        // $head=$name.' по доступной цене. Новостройка';
                    }
                    elseif ($rand<80) {
                        if ($fix_size) {
                            $head='Просторная '.mb_strtolower($name,'utf-8').' в новом ЖК';
                        }
                        else {
                            $head='Просторная '.mb_strtolower($name,'utf-8');
                        }
                    }
                    elseif ($rand<90) {
                        if ($fix_size) {
                            $head='Продается '.mb_strtolower($name,'utf-8').' в '.$complex;
                        }
                        else {
                            $head='Продается '.mb_strtolower($name,'utf-8');
                        }
                    }
                    else {
                        if ($fix_size) {
                            $head=$name.' от застройщика в '.$complex;
                        }
                        else {
                            $head=$name.' от застройщика';
                        }
                    }
                }
            }
        }
    }
    while(mb_strlen($head, 'utf-8')>50 && $fix_size);

    if ($flat_new!='?') {
        $head=str_replace(' от застройщика','',$head);
        if ($flat_new!='y') {
            $head=trim(str_replace('Продается','',$head));
            $head=trim(str_replace('Продаются','',$head));
            $head=str_replace('комнатная','комнатную',$head);
            $head=str_replace('квартира','квартиру',$head);
            $head=str_replace('студия','студию',$head);
            $head='Продаю '.mb_strtolower(mb_substr($head,0,1,'utf-8'),'utf-8').mb_substr($head,1,mb_strlen($head,'utf-8'),'utf-8');
            $head=str_replace('просторная','просторную',$head);
        }
    }

    return $head;
}

//----------------------------------------------------------------------
// Автодобавление точки после незаконченного предложения
//----------------------------------------------------------------------
function fix_desc($str) {
    $str=strip_tags(trim($str));
    if (!preg_match('/[\!\?\.]$/isu',$str)) {
        $str.='.';
    }
    return $str;
}

//----------------------------------------------------------------------
// Автоматическая генерация текста объявления
//----------------------------------------------------------------------
function generate_desc_new($flat_id, $norich=false, $avito=false, $no_campaign=false) {
    global $db;

    static $complex_data;
    static $complex_metro;
    static $building_metro;
    static $building_metro_clear;
    static $complex_metro_add;
    static $complex_metro_clear;

    // Подгрузить шаблоны
    static $templates;
    if (!isset($templates)) {
        $q="SELECT *
            FROM `@_templates`
        ";
        $db->query($q,'tpl');
        while($tmp=$db->fetch_array('tpl')) {
            $templates[$tmp['template_id']]=$tmp['template_text'];
        }
    }

    // Подгрузить описания для отделок
    static $building_data;
    if (!isset($building_data)) {
        $q="SELECT `@_building_decor`.*,
            COUNT(`foto_id`) AS `bd_foto`
            FROM `@_building_decor`
            LEFT JOIN `@_foto` ON (
                `foto_parent`=`bd_id`
                AND `foto_type`='buildingdecor'
            )
            GROUP BY `bd_id`
        ";
        $db->query($q, 'desc');
        while($tmp=$db->fetch_array('desc')) {
            if (!isset($building_data[$tmp['bd_building_id']])) {
                $building_data[$tmp['bd_building_id']]=array();
            }
            $building_data[$tmp['bd_building_id']][$tmp['bd_decor_id']]['txt']=$tmp['bd_text'];
            $building_data[$tmp['bd_building_id']][$tmp['bd_decor_id']]['img']=$tmp['bd_foto'];
        }
    }

    static $complex_decor;
    if (!isset($complex_decor)) {
        $q="SELECT `@_complex_decor`.*,
            COUNT(`foto_id`) AS `cd_foto`
            FROM `@_complex_decor`
            LEFT JOIN `@_foto` ON (
                `foto_parent`=`cd_id`
                AND `foto_type`='complexdecor'
            )
            GROUP BY `cd_id`
        ";
        $db->query($q, 'desc');
        while($tmp=$db->fetch_array('desc')) {
            if (!isset($complex_decor[$tmp['cd_complex_id']])) {
                $complex_decor[$tmp['cd_complex_id']]=array();
            }
            $complex_decor[$tmp['cd_complex_id']][$tmp['cd_decor_id']]['txt']=$tmp['cd_text'];
            $complex_decor[$tmp['cd_complex_id']][$tmp['cd_decor_id']]['img']=$tmp['cd_foto'];
        }
    }

    $desc='';

    // Получить данные о квартире
    $q="SELECT
        `@_flats`.*, `@_sections`.*, `@_currency`.*, `@_buildings`.*
        , `@_buildings_detail`.*, `@_complex`.*, `@_complex_detail`.*
        , `@_build_stages`.*, `@_build_materials`.*
        , GROUP_CONCAT(`ss`.`section_levels` SEPARATOR '|') AS `bld_sections`
        FROM `@_flats`
            LEFT JOIN `@_sections` ON `flat_section`=`section_id`
            LEFT JOIN `@_currency` ON `flat_currency`=`currency_id`
        ,`@_buildings`
            LEFT JOIN `@_sections` AS `ss` ON `building_id`=`section_building`
            LEFT JOIN `@_build_stages` ON `building_stage`=`build_stage_id`
            LEFT JOIN `@_build_materials` ON `building_material`=`build_material_id`
        ,`@_buildings_detail`
        ,`@_complex`
        ,`@_complex_detail`
        WHERE
        `flat_building`=`building_detail_id`
        AND `@_buildings_detail`.`building_building`=`building_id`
        AND `complex_id`=`building_complex`
        AND `@_complex_detail`.`complex_complex`=`complex_id`
        AND `complex_client`=`flat_client`
        AND `building_client`=`flat_client`
        AND `flat_id`='".$db->escape($flat_id)."'
        GROUP BY `flat_id`
    ";
    $db->query($q,'gd_flat');
    if ($db->num_rows('gd_flat')) {
        $flat=$db->fetch_array('gd_flat');

        if (!isset($templates[$flat['flat_template']])) {
            if (!isset($templates[$flat['building_template']])) {
                if (!isset($templates[$flat['complex_template']])) {
                    $template='';
                }
                else {
                    $template=$templates[$flat['complex_template']];
                }
            }
            else {
                $template=$templates[$flat['building_template']];
            }
        }
        else {
            $template=$templates[$flat['flat_template']];
        }

        if (!isset($flat['flat_studio'])) {
            $flat['flat_studio']='n';
        }

        // Если указана секция, то заменить
        if ($flat['flat_level_total']>0) {
            $flat['section_levels']=$flat['flat_level_total'];
        }

        // Собственность
        if ($flat['flat_own']==0) {
            $flat['flat_own']=$flat['building_own'];
        }

        // Название корпуса для публикации
        if ($flat['building_fake']!='') {
            $flat['building_ident']=$flat['building_fake'];
        }

        // core::pre($flat);
        // exit;

        // Имена шаблонов
        $parts_names=array(
            'DESCRIPTION',
            'CAMPAIGN_SHORT',
            'CAMPAIGN_FULL',
            'CAMPAIGN_SOFT',
            'FLAT_FULL',
            'FLAT_SHORT',
            'FLAT_COMMENT',
            'FLAT_TEXT',
            'FLAT_SOFT',
            'FLAT_MINI',
            'DECOR_FULL',
            'DECOR_SHORT',
            'BUILDING_FULL',
            'BUILDING_SHORT',
            'BUILDING_SOFT',
            'BUILDING_COMMENT',
            'COMPLEX_COMMENT',
            'COMPLEX_RULES',
            'BANK',
            'METRO',
            'METRO_SOFT',
            'COMMERCE',
        );
        // Содержимое шаблонов
        $parts_data=array();

        //-----------------------------------------------
        // Блок {DESCRIPTION}
        // Оригинальный текст объявления
        //-----------------------------------------------
        if ($flat['flat_desc']!='') {
            $parts_data['DESCRIPTION']=fix_desc($flat['flat_desc']);
        }

        //-----------------------------------------------
        // Блок {FLAT_MINI}
        // Микро описание квартиры
        //-----------------------------------------------
        $desc='';
        $desc.='Продается ';
        $desc.=$flat['flat_room'].'-комнатная квартира площадью ';
        $desc.=$flat['flat_room_total'].' кв.м.';
        $parts_data['FLAT_MINI']=fix_desc($desc);

        //-----------------------------------------------
        // Блок {FLAT_SOFT}
        // Краткое описание квартиры
        //-----------------------------------------------
        $desc='';
        while(true) {
            $tmp=generate_head($flat['flat_room'], $flat['complex_name'], false, $flat['flat_studio']==='y', $flat['flat_apart']==='y', $flat['complex_renew']==1, $flat['building_own']==3, $flat['flat_new']);
            if (strpos($tmp,' в '.$flat['complex_name'])==false) { break; }
        }
        $tmp=str_replace(' от застройщика','',$tmp);

        $desc.=$tmp;
        $desc.=' площадью '.$flat['flat_room_total'].' кв.м.,';

        if (isset($flat['flat_decor']) && $flat['flat_decor']>0) {
            switch ($flat['flat_decor']) {
                case '1': {
                    $desc.=' без отделки';
                    break;
                }
                case '2': {
                    $desc.=' с первичной отделкой';
                    break;
                }
                case '3': {
                    $desc.=' с отделкой';
                    break;
                }
                case '4': {
                    $desc.=' с чистовой отделкой "под ключ"';
                    break;
                }
                case '5': {
                    $desc.=' с предчистовой отделкой';
                    break;
                }
                case '6': {
                    $desc.=' с чистовой отделкой "под ключ"';
                    break;
                }
                case '7': {
                    $desc.=' с отделкой и мебелировкой';
                    break;
                }
            }
            $desc.=',';
        }

        if (isset($flat['section_levels']) && $flat['section_levels']!='' && isset($flat['flat_level']) && $flat['flat_level']!='') {
            $desc.=' на '.$flat['flat_level'].' этаже из '.$flat['section_levels'];
        }
        if (isset($flat['complex_name']) && $flat['complex_name']!='' && strpos($desc,' в '.$flat['complex_name'])==false) {
            $desc.=' в ';
            $cpl_name=$flat['complex_name'];
            switch($flat['building_category']) {
                case '1': {
                    $desc.='жилом комплексе эконом-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '2': {
                    $desc.='жилом комплексе комфорт-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '3': {
                    $desc.='жилом комплексе бизнес-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '4': {
                    $desc.='жилом комплексе премиум-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '5': {
                    $desc.='элитном жилом комплексе ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
            }
            $desc.=$cpl_name;
        }
        $desc=fix_desc($desc);

        switch($flat['flat_type']) {
            // смежные
            case '1': {
                if (rand(0,100)<50) {
                    $desc.=' Смежные комнаты';
                }
                else {
                    $desc.=' Комнаты смежные';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень удобная планировка для проживания семьи с детьми';
                }
                elseif ($rand<60) {
                    $desc.='квартиры с такой планировкой отлично подойдет для проживания семьи с детьми';
                }
                else {
                    $desc.='с такой планировкой жилое пространство увеличено относительно общей площади';
                }
                break;
            }
            // линейные
            case '2': {
                $desc.=' Квартира с линейной планировкой, ';
                if ($flat['flat_room']==1) {
                    $desc.='все окна выходят на одну сторону';
                }
                else {
                    $desc.='комнаты изолированные, при этом все окна выходят на одну сторону';
                }
                break;
            }
            // распашонки
            case '3': {
                $desc.=' Квартира - распашонка, ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='здесь нет проходных комнат, зато очень много света. Квартира идеальна для бoльшой ceмьи';
                }
                elseif ($rand<60) {
                    $desc.='окна выxoдят oднoвpeмeннo нa две cтopoны дoмa, весь день комнаты залиты светом';
                }
                else {
                    $desc.='без проходных комнат, окна однорвеменно смотрят во двop и на yлицy';
                }
                break;
            }
            // раздельные
            case '4': {
                if (rand(0,100)<50) {
                    $desc.=' В квартире раздельные комнаты';
                }
                else {
                    $desc.=' Комнаты в квартире раздельные';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='а планировка обеспечивает изоляцию комнат друг от друга и от коридора';
                }
                elseif ($rand<60) {
                    $desc.='все они изолированы друг от друга и от коридора';
                }
                else {
                    $desc.='это идеальный вариант для проживания семьи с детьми';
                }
                break;
            }
            // изолированные
            case '5': {
                if ($flat['flat_room']==1) {
                    $desc.=' В квартире изолированные комнаты, а все окна выходят на одну сторону';
                }
                else {
                    $desc.=' Изолированные комнаты, все окна выходят на одну сторону';
                }
                break;
            }
            // угловая
            case '6': {
                if (rand(0,100)<50) {
                    $desc.=' Угловая квартира';
                }
                else {
                    $desc.=' Квартира угловая';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='в течение дня комнаты отлично освещаются, можно открыть окна и получить естественную вентиляцию';
                }
                elseif ($rand<60) {
                    $desc.='а окна, выходящие на разные стороны дома, дают paвнoмepнoe ocвeщeниe комнат в тeчeниe дня';
                }
                else {
                    $desc.='такая планировка отлично подойдет всем любителям панорамных видов и тишины';
                }
                break;
            }
            // трехсторонняя
            case '7': {
                $desc.=' Квартира ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень светлая, трехсторонняя, такая планировка отлично подходит для бoльшиx ceмeй';
                }
                elseif ($rand<60) {
                    $desc.='выxoдит oкнaми oднoвpeмeннo нa три cтopoны дoмa, поэтому комнаты равномерно освещены весь день';
                }
                else {
                    $desc.='имеет удобную планировку, тут нет проходных комнат, а окона выходят нa три cтopoны одновременно';
                }
                break;
            }
        }
        $desc=fix_desc($desc);

        if ($flat['flat_level']>18) {
            $desc.=' Высокий этаж позволяет наслаждаться отличными видами.';
        }

        if ((isset($flat['flat_balcon']) && $flat['flat_balcon']>0) || (isset($flat['flat_lodgia']) && $flat['flat_lodgia']>0) || (isset($flat['flat_sus']) && $flat['flat_sus']>0) || (isset($flat['flat_sur']) && $flat['flat_sur']>0)){
            $desc.=' В квартире ';

            // Балконы и лоджии
            $xdesc='';
            if (isset($flat['flat_balcon']) && $flat['flat_balcon']>0) {
                $xdesc.=num2word2($flat['flat_balcon']).' '.num2word($flat['flat_balcon'],array('балкон', 'балкона', 'балконов'));
            }
            if (isset($flat['flat_lodgia']) && $flat['flat_lodgia']>0) {
                if (isset($flat['flat_balcon']) && $flat['flat_balcon']>0) {
                    $xdesc.=' и ';
                }
                $xdesc.=num2word1($flat['flat_lodgia']).' '.num2word($flat['flat_lodgia'],array('лоджия', 'лоджии', 'лоджий'));
            }

            // Санузлы
            $ydesc='';
            if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                $ydesc.=num2word2($flat['flat_sus']).' '.num2word($flat['flat_sus'],array('совмещенный', 'совмещенных', 'совмещенных'));
            }
            if (isset($flat['flat_sur']) && $flat['flat_sur']>0) {
                if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                    $ydesc.=' и ';
                }
                $ydesc.=num2word2($flat['flat_sur']).' '.num2word($flat['flat_sur'],array('раздельный санузел', 'раздельных санузла', 'раздельных санузлов'));
            }
            else {
                if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                    $ydesc.=' '.num2word($flat['flat_sus'],array('санузел', 'санузла', 'санузлов'));
                }
            }

            $desc.=$xdesc;
            if ($ydesc!='') {
                if ($xdesc!='') {
                    $desc.=', ';
                }
                $desc.=$ydesc;
            }
            $desc=fix_desc($desc);
        }

        // Терраса
        if (isset($flat['flat_tera']) && $flat['flat_tera']>0) {
            if (rand(0,100)>50) {
                if (rand(0,100)>50) {
                    $desc.=' Наличие террасы в квартире ';
                }
                else {
                    $desc.=' Наличие в квартире террасы ';
                }

                if (rand(0,100)>50) {
                    $desc.='дает';
                }
                else {
                    $desc.='открывает';
                }

                $desc.=' возможность для ';

                if (rand(0,100)>50) {
                    $desc.='обустройства дополнительной площади.';
                }
                else {
                    $desc.='создания зон отдыха в кругу семьи и друзей.';
                }
            }
            else {
                $desc.=' Терраса представляет собой роскошную зону отдыха';
                if (rand(0,100)>50) {
                    $desc.=' для проведение вечеров в кругу семьи и друзей или организация вечеринок.';
                }
                else {
                    $desc.=', где вы на свой вкус можете создать атмосферу комфорта и уюта.';
                }
            }
            $desc=fix_desc($desc);
        }

        if ($flat['flat_height']!='') {
            $flat['building_height']=$flat['flat_height'];
        }
        if (isset($flat['building_height']) && $flat['building_height']!='') {
            $desc.=' Высота потолков '.$flat['building_height'].' м.';
        }

        $parts_data['FLAT_SOFT']=trim($desc);

        //-----------------------------------------------
        // Блок {FLAT_SHORT}
        // Краткое описание квартиры
        //-----------------------------------------------
        $desc='';
        $tmp='';
        while(true) {
            $tmp=generate_head($flat['flat_room'], $flat['complex_name'], false, $flat['flat_studio']==='y', $flat['flat_apart']==='y', $flat['complex_renew']==1, $flat['building_own']==3, $flat['flat_new']);
            if (strpos($tmp,' в '.$flat['complex_name'])==false) { break; }
        }
        $tmp=str_replace(' от застройщика','',$tmp);

        $desc.=$tmp;
        if (isset($flat['flat_decor']) && $flat['flat_decor']>1) {
            $desc.=' с отделкой';
        }
        if (isset($flat['section_levels']) && $flat['section_levels']!='' && isset($flat['flat_level']) && $flat['flat_level']!='') {
            if ($flat['flat_level']>2) {
                $desc.=' на '.$flat['flat_level'].' этаже';
            }
        }
        if (isset($flat['complex_name']) && $flat['complex_name']!='' && strpos($desc,' в '.$flat['complex_name'])==false) {
            $desc.=' в ';
            $cpl_name=$flat['complex_name'];
            switch($flat['building_category']) {
                case '1': {
                    $desc.='жилом комплексе эконом-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '2': {
                    $desc.='жилом комплексе комфорт-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '3': {
                    $desc.='жилом комплексе бизнес-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '4': {
                    $desc.='жилом комплексе премиум-класса ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
                case '5': {
                    $desc.='элитном жилом комплексе ';
                    $cpl_name=trim(str_replace('ЖК','',$flat['complex_name']));
                    break;
                }
            }
            $desc.=$cpl_name;
        }

        // core::pre($desc);
        // exit;

        $desc=fix_desc($desc);

        if (isset($flat['flat_room_total']) && $flat['flat_room_total']!='') {
            $desc.=' Общая площадь: '.$flat['flat_room_total'].' кв.м.';

            if ($flat['flat_studio']=='y' && $flat['flat_room']==1 && isset($flat['flat_room_kitchen']) && $flat['flat_room_kitchen']!='') {
                $desc.=', площадь гостиной с кухонной зоной ';
                $desc.=doubleval($flat['flat_room_live'])+doubleval($flat['flat_room_kitchen']);
                $desc.=' кв.м.';
            }
            else {
                if (isset($flat['flat_room_rooms']) && $flat['flat_room_rooms']!='') {
                    $tmp=explode(' ',$flat['flat_room_rooms']);
                    if (count($tmp)>1) {
                        $xxs=array_pop($tmp);
                        $desc.=', жилые комнаты '.join(', ',$tmp);
                        $desc.=' и '.$xxs;
                        $desc.=' кв.м.';
                    }
                    else {
                        $desc.=', комната '.$flat['flat_room_live'].' кв.м.';
                    }
                }

                if (isset($flat['flat_room_guest']) && $flat['flat_room_guest']!='') {
                    $desc.=', ';
                    if (rand(0,100)>50) {
                        $desc.='суммарная';
                    }
                    else {
                        $desc.='общая';
                    }
                    $desc.=' площадь гостиной-столовой с кухонной зоной';
                    $desc.=': '.$flat['flat_room_guest'].' кв.м.';
                }
                else if (isset($flat['flat_room_kitchen']) && $flat['flat_room_kitchen']!='') {
                    $desc.=', площадь ';
                    if ($flat['flat_room_kitchen']>8.99) {
                        $desc.='просторной ';
                    }
                    if ($flat['flat_studio']=='y') {
                        if ($flat['flat_room']>1) {
                            $desc.='кухонной зоны в гостиной-столовой';
                        }
                        else {
                            $desc.='кухни-студии';
                        }
                    }
                    else {
                        $desc.='кухни';
                        if ($flat['flat_room_kitchen']>8.99) {
                            $desc.='-столовой';
                        }
                    }
                    $desc.=': '.$flat['flat_room_kitchen'].' кв.м.';
                }
            }
        }

        switch($flat['flat_type']) {
            // смежные
            case '1': {
                if (rand(0,100)<50) {
                    $desc.=' Смежные комнаты';
                }
                else {
                    $desc.=' Комнаты смежные';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='удобная планировка';
                }
                elseif ($rand<60) {
                    $desc.='такая планировка хорошо подойдет семьям с детьми';
                }
                else {
                    $desc.='увеличенное жилое пространство по отношению к общему метражу';
                }
                break;
            }
            // линейные
            case '2': {
                $desc.=' Квартира линейная, удобная планировка,';
                if ($flat['flat_room']==1) {
                    $desc.=' все окна выходят на одну сторону';
                }
                else {
                    $desc.=' все комнаты изолированные, а окна выходят на одну сторону';
                }
                break;
            }
            // распашонки
            case '3': {
                $desc.=' Квартира - распашонка, ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень светлая, без проходных комнат, планировка кoмфopтнa для бoльшиx ceмeй';
                }
                elseif ($rand<60) {
                    $desc.='выxoдит oкнaми нa oбe cтopoны дoмa oднoвpeмeннo, комнаты в течение дня равномерно освещены';
                }
                else {
                    $desc.='без проходных комнат, из paзныx окон мoжнo yвидeть двop и yлицy';
                }
                break;
            }
            // раздельные
            case '4': {
                if (rand(0,100)<50) {
                    $desc.=' Раздельные комнаты';
                }
                else {
                    $desc.=' Комнаты раздельные';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='удобная планировка';
                }
                elseif ($rand<60) {
                    $desc.='все комнаты изолированы друг от друга и от коридора';
                }
                else {
                    $desc.='идеальный вариант для семей с детьми';
                }
                break;
            }
            // изолированные
            case '5': {
                if ($flat['flat_room']==1) {
                    $desc.=' Все окна выходят на одну сторону';
                }
                else {
                    $desc.=' Комнаты изолированные, все окна выходят на одну сторону';
                }
                break;
            }
            // угловая
            case '6': {
                if (rand(0,100)<50) {
                    $desc.=' Угловая квартира';
                }
                else {
                    $desc.=' Квартира угловая';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень светлая, естественная вентиляция при открытии окон';
                }
                elseif ($rand<60) {
                    $desc.='окна oбecпeчивaют paвнoмepнoe ocвeщeниe в тeчeниe дня';
                }
                else {
                    $desc.='идеально подойдет любителям тишины и панорамных видов';
                }
                break;
            }
            // трехсторонняя
            case '7': {
                $desc.=' Квартира ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень светлая, трехсторонняя, планировка кoмфopтнa для бoльшиx ceмeй';
                }
                elseif ($rand<60) {
                    $desc.='выxoдит oкнaми нa три cтopoны дoмa oднoвpeмeннo, комнаты в течение дня равномерно освещены';
                }
                else {
                    $desc.='без проходных комнат, из окон нa три cтopoны мoжнo yвидeть двop и yлицy';
                }
                break;
            }
            // default: {
            //     $desc.='Тип комнат '.$flat['flat_type'];
            //     break;
            // }
        }
        $desc=fix_desc($desc);

        if ((isset($flat['flat_balcon']) && $flat['flat_balcon']>0) || (isset($flat['flat_lodgia']) && $flat['flat_lodgia']>0) || (isset($flat['flat_sus']) && $flat['flat_sus']>0) || (isset($flat['flat_sur']) && $flat['flat_sur']>0)){
            $desc.=' В квартире ';

            // Балконы и лоджии
            $xdesc='';
            if (isset($flat['flat_balcon']) && $flat['flat_balcon']>0) {
                $xdesc.=num2word2($flat['flat_balcon']).' '.num2word($flat['flat_balcon'],array('балкон', 'балкона', 'балконов'));
            }
            if (isset($flat['flat_lodgia']) && $flat['flat_lodgia']>0) {
                if (isset($flat['flat_balcon']) && $flat['flat_balcon']>0) {
                    $xdesc.=' и ';
                }
                $xdesc.=num2word1($flat['flat_lodgia']).' '.num2word($flat['flat_lodgia'],array('лоджия', 'лоджии', 'лоджий'));
            }

            // Санузлы
            $ydesc='';
            if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                $ydesc.=num2word2($flat['flat_sus']).' '.num2word($flat['flat_sus'],array('совмещенный', 'совмещенных', 'совмещенных'));
            }
            if (isset($flat['flat_sur']) && $flat['flat_sur']>0) {
                if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                    $ydesc.=' и ';
                }
                $ydesc.=num2word2($flat['flat_sur']).' '.num2word($flat['flat_sur'],array('раздельный санузел', 'раздельных санузла', 'раздельных санузлов'));
            }
            else {
                if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                    $ydesc.=' '.num2word($flat['flat_sus'],array('санузел', 'санузла', 'санузлов'));
                }
            }

            $desc.=$xdesc;
            if ($ydesc!='') {
                if ($xdesc!='') {
                    $desc.=', ';
                }
                $desc.=$ydesc;
            }
            $desc=fix_desc($desc);
        }

        // Терраса
        if (isset($flat['flat_tera']) && $flat['flat_tera']>0) {
            if (rand(0,100)>50) {
                if (rand(0,100)>50) {
                    $desc.=' Наличие террасы в квартире ';
                }
                else {
                    $desc.=' Наличие в квартире террасы ';
                }

                if (rand(0,100)>50) {
                    $desc.='дает';
                }
                else {
                    $desc.='открывает';
                }

                $desc.=' возможность для ';

                if (rand(0,100)>50) {
                    $desc.='обустройства дополнительной площади.';
                }
                else {
                    $desc.='создания зон отдыха в кругу семьи и друзей.';
                }
            }
            else {
                $desc.=' Терраса представляет собой роскошную зону отдыха';
                if (rand(0,100)>50) {
                    $desc.=' для проведение вечеров в кругу семьи и друзей или организация вечеринок.';
                }
                else {
                    $desc.=', где вы на свой вкус можете создать атмосферу комфорта и уюта.';
                }
            }
            $desc=fix_desc($desc);
        }

        if ($flat['flat_height']!='') {
            $flat['building_height']=$flat['flat_height'];
        }
        if (isset($flat['building_height']) && $flat['building_height']!='') {
            $desc.=' Высота потолков '.$flat['building_height'].' м.';
        }

        $parts_data['FLAT_SHORT']=trim($desc);

        //-----------------------------------------------
        // Блок {FLAT_FULL}
        // Максимальное описание квартиры
        //-----------------------------------------------
        $desc='';
        $tmp='';
        while(true) {
            $tmp=generate_head($flat['flat_room'], $flat['complex_name'], false, $flat['flat_studio']==='y', $flat['flat_apart']==='y', $flat['complex_renew']==1, $flat['building_own']==3);
            if (strpos($tmp,' в '.$flat['complex_name'])==false) { break; }
            // Для Инграда не должно быть названий ЖК
            if ($flat['flat_client']!=32) { break; }
        }
        $desc.=$tmp;

        // if ((isset($building_data[$flat['building_detail_id']]) && isset($building_data[$flat['building_detail_id']][$flat['flat_decor']])) || (isset($complex_decor[$flat['complex_detail_id']]) && isset($complex_decor[$flat['complex_detail_id']][$flat['flat_decor']]))) {
        //     // описание есть, ничего тут не пишем
        // }
        if (isset($flat['flat_decor']) && $flat['flat_decor']>1) {
            if ($flat['flat_studio']=='y' && $flat['flat_room']>1) {
                $desc.=' и ';
                $desc=str_replace(' от застройщика','',$desc);
            }
            else {
                $desc.=' с ';
            }

            if ($flat['flat_decor']==3 || $flat['flat_decor']==6) {
                $desc.='отделкой';
            }
            elseif ($flat['flat_decor']==2) {
                $desc.='отделкой "WHITE BOX"';
            }
            elseif ($flat['flat_decor']==7) {
                $desc.='отделкой и мебелировкой';
            }
            else {
                $desc.='первичной отделкой';
            }
        }

        // Только для А101
        if ($flat['flat_client']==94 && $flat['building_category']==3) {
            $desc=str_replace(' квартира',' квартира бизнес-класса',$desc);
            $desc=str_replace(' студия',' студия бизнес-класса',$desc);
        }

        // Для Инграда не должно быть названий ЖК
        if ($flat['flat_client']!=32) {
            if (isset($flat['complex_name']) && $flat['complex_name']!='' && strpos($desc,' в '.$flat['complex_name'])==false) {
                $desc.=' в '.$flat['complex_name'];
            }
        }
        if (isset($flat['section_levels']) && $flat['section_levels']!='' && isset($flat['flat_level']) && $flat['flat_level']!='') {
            $desc.=' на '.$flat['flat_level'].' этаже';
        }
        $desc=fix_desc($desc);

        // Квартира без отделки
        if ($flat['flat_decor']=='1') {
            $rand=rand(0,100);
            if ($flat['flat_apart']=='y') {
                $desc.=' Апартаменты';
            }
            else {
                $desc.=' Квартира';
            }
            $desc.=' без отделки, ';
            if ($rand<30) {
                $desc.='новый ';
                if (rand(0,100)<50) {
                    $desc.='собственник';
                }
                else {
                    $desc.='владелец';
                }
                $desc.=' может сделать ремонт по ';
                if (rand(0,100)<50) {
                    $desc.='своему ';
                }
                else {
                    $desc.='индивидуальному ';
                }
                if (rand(0,100)<50) {
                    $desc.='дизайн-';
                }
                $desc.='проекту';
            }
            elseif ($rand<60) {
                $desc.='полностью готова к ';
                if (rand(0,100)<50) {
                    $desc.='чистовой отделке и дальнейшему ';
                }
                $desc.='ремонту';
            }
            else {
                if (rand(0,100)<50) {
                    $desc.='после ';
                    if (rand(0,100)<50) {
                        $desc.='получения';
                    }
                    else {
                        $desc.='выдачи';
                    }
                    $desc.=' ключей ';
                }
                else {
                    $desc.='после оформления собственности ';
                }
                $desc.='можно делать ремонт';
            }

            $desc=fix_desc($desc);
        }

        if (isset($flat['flat_freeplan']) && $flat['flat_freeplan']=='y') {
            $desc.=' Свободная планировка, представлен возможный вариант.';
        }

        if (isset($flat['flat_floors']) && $flat['flat_floors']>1) {
            if ($flat['flat_apart']=='y') {
                if (rand(0,100)<15) {
                    $desc.=' Многоуровневые апартаменты';
                }
                else {
                    if ($flat['flat_floors']==2 && rand(0,100)<70) {
                        $desc.=' Двухуровневые апартаменты';
                    }
                    else {
                        $desc.=' '.$flat['flat_floors'].'-уровневые апартаменты';
                    }
                }
            }
            else {
                if (rand(0,100)<15) {
                    $desc.=' Многоуровневая квартира';
                }
                else {
                    if ($flat['flat_floors']==2 && rand(0,100)<70) {
                        $desc.=' Двухуровневая квартира';
                    }
                    else {
                        $desc.=' '.$flat['flat_floors'].'-уровневая квартира';
                    }
                }
            }

            $tmp=rand(0,60);
            if ($tmp<10) {
                $desc.=', большое количество свободного пространства дает возможность воплотить в жизнь свои дизайнерские идеи.';
            }
            elseif ($tmp<20) {
                $desc.=', на каждом этаже вы можете выделить различные функциональные зоны.';
            }
            elseif ($tmp<30) {
                $desc.=' с возможностью разделения гостевой зоны и личного пространства.';
            }
            elseif ($tmp<40) {
                $desc.=', большая площадь и простор для воплощения дизайнерских идей.';
            }
            elseif ($tmp<50) {
                $desc.=', планировка позволяет организовать индивидуальное пространство для каждого члена семьи.';
            }
            else {
                $desc.=', множество вариантов распределения полезного пространства.';
            }
        }

        // ... клоуны часть 100500...
        if ($flat['complex_name']=='ЖК "Лайнер"') {
            $desc.=' Общая площадь: '.$flat['flat_room_total'].' кв.м.';

            if (isset($flat['flat_room_live']) && $flat['flat_room_live']!='') {
                $desc.=', жилая: '.$flat['flat_room_live'].' кв.м.';
            }
        }
        else {
            if (isset($flat['flat_room_total']) && $flat['flat_room_total']!='') {

                $desc.=' Общая площадь: '.$flat['flat_room_total'].' кв.м.';

                if ($flat['flat_studio']=='y' && $flat['flat_room']==1 && isset($flat['flat_room_kitchen']) && $flat['flat_room_kitchen']!='') {
                    $desc.=', площадь гостиной ';
                    $desc.=doubleval($flat['flat_room_live'])+doubleval($flat['flat_room_kitchen']);
                    $desc.=' кв.м., из которых '.doubleval($flat['flat_room_kitchen']).' кв.м. выделено под кухонную зону.';
                }
                else {
                    if (isset($flat['flat_room_live']) && $flat['flat_room_live']!='') {
                        $desc.=', жилая: '.$flat['flat_room_live'].' кв.м.';
                    }

                    // Для заречье девелопмент не передаем кухню
                    if ($flat['flat_client']!=84) {
                        if (isset($flat['flat_room_guest']) && $flat['flat_room_guest']!='') {
                            $desc.=', ';
                            if (rand(0,100)>50) {
                                $desc.='суммарная';
                            }
                            else {
                                $desc.='общая';
                            }
                            $desc.=' площадь гостиной-столовой с кухонной зоной';
                            $desc.=': '.$flat['flat_room_guest'].' кв.м.';
                        }
                        else if (isset($flat['flat_room_kitchen']) && $flat['flat_room_kitchen']!='') {
                            $desc.=', площадь ';
                            if ($flat['flat_room_kitchen']>8.99) {
                                $desc.='просторной ';
                            }
                            if ($flat['flat_studio']=='y') {
                                if ($flat['flat_room']>1) {
                                    $desc.='кухонной зоны в гостиной-столовой';
                                }
                                else {
                                    $desc.='кухни-студии';
                                }
                            }
                            else {
                                $desc.='кухни';
                                if ($flat['flat_room_kitchen']>8.99) {
                                    $desc.='-столовой';
                                }
                            }
                            $desc.=': '.$flat['flat_room_kitchen'].' кв.м.';
                        }
                    }
                }
            }
        }

        if (isset($flat['flat_studio']) && $flat['flat_studio']=='y' && $flat['flat_room']>1) {
            if (rand(0,100)<50) {
                $desc.=' Европейская планировка, ';
            }
            else {
                $desc.=' Европланировка, ';
            }

            $tmp=rand(0,100);
            if ($tmp<20) {
                $desc.='зона гостиной комнаты объединена с кухней.';
            }
            elseif ($tmp<40) {
                $desc.='кухня и гостиная объединены в одно просторное помещение.';
            }
            elseif ($tmp<60) {
                if ($flat['flat_room']>2) {
                    $desc.='площадь комнат позволяет разместить в них все необходимое, а ';
                }
                $desc.='в просторной кухне-гостиной удобно как готовить, так и отдыхать.';
            }
            elseif ($tmp<80) {
                $desc.='за счет большой площади кухни-гостиной квартира выглядит просторной и очень удобна для жизни.';
            }
            else {
                $desc.='кухня-гостиная - идеальный вариант для тех, кто любит часто принимать гостей.';
            }
        }

        switch($flat['flat_type']) {
            // смежные
            case '1': {
                if (rand(0,100)<50) {
                    $desc.=' Смежные комнаты';
                }
                else {
                    $desc.=' Комнаты смежные';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='удобная планировка';
                }
                elseif ($rand<60) {
                    $desc.='такая планировка хорошо подойдет семьям с детьми';
                }
                else {
                    $desc.='увеличенное жилое пространство по отношению к общему метражу';
                }
                break;
            }
            // линейные
            case '2': {
                $desc.=' Квартира линейная, удобная планировка,';
                if ($flat['flat_room']==1) {
                    $desc.=' все окна выходят на одну сторону';
                }
                else {
                    $desc.=' все комнаты изолированные, а окна выходят на одну сторону';
                }
                break;
            }
            // распашонки
            case '3': {
                $desc.=' Квартира - распашонка, ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень светлая, без проходных комнат, планировка кoмфopтнa для бoльшиx ceмeй';
                }
                elseif ($rand<60) {
                    $desc.='выxoдит oкнaми нa oбe cтopoны дoмa oднoвpeмeннo, комнаты в течение дня равномерно освещены';
                }
                else {
                    $desc.='без проходных комнат, окна выходят на paзные стороны дома';
                }
                break;
            }
            // раздельные
            case '4': {
                if (rand(0,100)<50) {
                    $desc.=' Раздельные комнаты';
                }
                else {
                    $desc.=' Комнаты раздельные';
                }
                $desc.=', ';
                if ($rand<30) {
                    $desc.='удобная планировка';
                }
                elseif ($rand<60) {
                    $desc.='все комнаты изолированы друг от друга и от коридора';
                }
                else {
                    $desc.='идеальный вариант для семей с детьми';
                }
                break;
            }
            // изолированные
            case '5': {
                if ($flat['flat_room']==1) {
                    $desc.=' Все окна выходят на одну сторону';
                }
                else {
                    $desc.=' Комнаты изолированные, все окна выходят на одну сторону';
                }
                break;
            }
            // угловая
            case '6': {
                if (rand(0,100)<50) {
                    $desc.=' Угловая квартира';
                }
                else {
                    $desc.=' Квартира угловая';
                }
                $desc.=', ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень светлая, естественная вентиляция при открытии окон';
                }
                elseif ($rand<60) {
                    $desc.='окна oбecпeчивaют paвнoмepнoe ocвeщeниe в тeчeниe дня';
                }
                else {
                    $desc.='идеально подойдет любителям тишины и панорамных видов';
                }
                break;
            }
            // трехсторонняя
            case '7': {
                $desc.=' Квартира ';
                $rand=rand(0,100);
                if ($rand<30) {
                    $desc.='очень светлая, трехсторонняя, планировка кoмфopтнa для бoльшиx ceмeй';
                }
                elseif ($rand<60) {
                    $desc.='выxoдит oкнaми нa три cтopoны дoмa oднoвpeмeннo, комнаты в течение дня равномерно освещены';
                }
                else {
                    $desc.='без проходных комнат, окна выходят нa три cтopoны дома';
                }
                break;
            }
            // default: {
            //     $desc.='Тип комнат '.$flat['flat_type'];
            //     break;
            // }
        }
        $desc=fix_desc($desc);

        if ((isset($flat['flat_balcon']) && $flat['flat_balcon']>0) || (isset($flat['flat_lodgia']) && $flat['flat_lodgia']>0) || (isset($flat['flat_sus']) && $flat['flat_sus']>0) || (isset($flat['flat_sur']) && $flat['flat_sur']>0)){
            if ($flat['flat_apart']=='y') {
                $desc.=' В апартаментах ';
            }
            else {
                $desc.=' В квартире ';
            }

            // Балконы и лоджии
            $xdesc='';
            if (isset($flat['flat_balcon']) && $flat['flat_balcon']>0) {
                $xdesc.=num2word2($flat['flat_balcon']).' '.num2word($flat['flat_balcon'],array('балкон', 'балкона', 'балконов'));
            }
            if (isset($flat['flat_lodgia']) && $flat['flat_lodgia']>0) {
                if (isset($flat['flat_balcon']) && $flat['flat_balcon']>0) {
                    $xdesc.=' и ';
                }
                $xdesc.=num2word1($flat['flat_lodgia']).' '.num2word($flat['flat_lodgia'],array('лоджия', 'лоджии', 'лоджий'));
            }

            // Санузлы
            $ydesc='';
            if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                $ydesc.=num2word2($flat['flat_sus']).' '.num2word($flat['flat_sus'],array('совмещенный', 'совмещенных', 'совмещенных'));
            }
            if (isset($flat['flat_sur']) && $flat['flat_sur']>0) {
                if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                    $ydesc.=' и ';
                }
                $ydesc.=num2word2($flat['flat_sur']).' '.num2word($flat['flat_sur'],array('раздельный санузел', 'раздельных санузла', 'раздельных санузлов'));
            }
            else {
                if (isset($flat['flat_sus']) && $flat['flat_sus']>0) {
                    $ydesc.=' '.num2word($flat['flat_sus'],array('санузел', 'санузла', 'санузлов'));
                }
            }

            $desc.=$xdesc;
            if ($ydesc!='') {
                if ($xdesc!='') {
                    $desc.=', ';
                }
                $desc.=$ydesc;
            }
            $desc=fix_desc($desc);
        }

        // Терраса
        if (isset($flat['flat_tera']) && $flat['flat_tera']>0) {
            if (rand(0,100)>50) {
                if (rand(0,100)>50) {
                    $desc.=' Наличие террасы ';
                    if ($flat['flat_tera']>1) {
                        if (rand(0,100)>50) {
                            $desc.='площадью ';
                        }
                        else {
                            $desc.='размером ';
                        }
                        $desc.=$flat['flat_tera'].' кв.м. ';
                    }
                    $desc.='в квартире ';
                }
                else {
                    $desc.=' Наличие в квартире террасы ';
                    if ($flat['flat_tera']>1) {
                        if (rand(0,100)>50) {
                            $desc.='площадью ';
                        }
                        else {
                            $desc.='размером ';
                        }
                        $desc.=$flat['flat_tera'].' кв.м. ';
                    }
                }

                if (rand(0,100)>50) {
                    $desc.='дает';
                }
                else {
                    $desc.='открывает';
                }

                $desc.=' возможность для ';

                if (rand(0,100)>50) {
                    $desc.='обустройства дополнительной площади.';
                }
                else {
                    $desc.='создания зон отдыха в кругу семьи и друзей.';
                }
            }
            else {
                $desc.=' Терраса ';

                if ($flat['flat_tera']>1) {
                    if (rand(0,100)>50) {
                        $desc.='площадью ';
                    }
                    else {
                        $desc.='размером ';
                    }
                    $desc.=$flat['flat_tera'].' кв.м. ';
                }

                $desc.='представляет собой роскошную зону отдыха';
                if (rand(0,100)>50) {
                    $desc.=' для проведение вечеров в кругу семьи и друзей или организация вечеринок.';
                }
                else {
                    $desc.=', где вы на свой вкус можете создать атмосферу комфорта и уюта.';
                }
            }
            $desc=fix_desc($desc);
        }

        if ($flat['flat_height']!='') {
            $flat['building_height']=$flat['flat_height'];
        }
        if (isset($flat['building_height']) && $flat['building_height']!='') {
            $desc.=' Высота потолков '.$flat['building_height'].' м.';
        }
        $parts_data['FLAT_FULL']=trim($desc);

        //-----------------------------------------------
        // Блок {DECOR_FULL}
        // Максимальное описание отделки из корпусов
        //-----------------------------------------------
        $desc='';
        $tmp='';
        if (isset($flat['flat_decor']) && $flat['flat_decor']>0) {
            if (isset($building_data[$flat['building_detail_id']]) && isset($building_data[$flat['building_detail_id']][$flat['flat_decor']])) {
                $desc.="\n\n";
                $desc.=$building_data[$flat['building_detail_id']][$flat['flat_decor']]['txt'];
                $desc=fix_desc($desc);

                // Есть фотки отделки
                if ($building_data[$flat['building_detail_id']][$flat['flat_decor']]['img']>0) {
                    $desc.=' ';
                    $tmp=rand(0,100);
                    if ($tmp<33) {
                        $desc.='Этот вариант отделки вы можете посмотреть на фотографиях.';
                    }
                    elseif ($tmp<66) {
                        $desc.='Посмотрите на фотографиях, как выглядит этот вариант отделки.';
                    }
                    else {
                        $desc.='Обратите внимание, на фотографиях показан этот вариант отделки.';
                    }
                }

                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // Текст отделки -> смотри фото
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
            elseif (isset($complex_decor[$flat['complex_detail_id']]) && isset($complex_decor[$flat['complex_detail_id']][$flat['flat_decor']])) {
                $desc.="\n\n";
                $desc.=$complex_decor[$flat['complex_detail_id']][$flat['flat_decor']]['txt'];
                $desc=fix_desc($desc);
                // Есть фотки отделки
                if ($complex_decor[$flat['complex_detail_id']][$flat['flat_decor']]['img']>0) {
                    $desc.=' ';
                    $tmp=rand(0,100);
                    if ($tmp<33) {
                        $desc.='Этот вариант отделки вы можете посмотреть на фотографиях.';
                    }
                    elseif ($tmp<66) {
                        $desc.='Посмотрите на фотографиях, как выглядит этот вариант отделки.';
                    }
                    else {
                        $desc.='Обратите внимание, на фотографиях показан этот вариант отделки.';
                    }
                }
            }
        }
        if ($desc!='') {
            $parts_data['DECOR_FULL']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {DECOR_SHORT}
        // Краткое описание отделки из корпусов
        //-----------------------------------------------
        $desc='';
        $tmp='';
        if (isset($flat['flat_decor']) && $flat['flat_decor']>0) {
            if (isset($building_data[$flat['building_detail_id']]) && isset($building_data[$flat['building_detail_id']][$flat['flat_decor']])) {
                $desc.="\n\n";
                $desc.=$building_data[$flat['building_detail_id']][$flat['flat_decor']]['txt'];
                $desc=fix_desc($desc);
                // Есть фотки отделки
                if ($building_data[$flat['building_detail_id']][$flat['flat_decor']]['img']>0) {
                    $desc.=' ';
                    $desc.='Варианты отделки вы можете посмотреть на фотографиях.';
                }
            }
            elseif (isset($complex_decor[$flat['complex_detail_id']]) && isset($complex_decor[$flat['complex_detail_id']][$flat['flat_decor']])) {
                $desc.="\n\n";
                $desc.=$complex_decor[$flat['complex_detail_id']][$flat['flat_decor']]['txt'];
                $desc=fix_desc($desc);
                // Есть фотки отделки
                if ($complex_decor[$flat['complex_detail_id']][$flat['flat_decor']]['img']>0) {
                    $desc.=' ';
                    $desc.='Варианты отделки вы можете посмотреть на фотографиях.';
                }
            }
        }
        if ($desc!='') {
            $parts_data['DECOR_SHORT']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {BUILDING_SOFT}
        // Краткое описание корпуса
        //-----------------------------------------------
        $desc='';
        $ss=explode('|',$flat['bld_sections']);

        $desc.='Корпус '.$flat['building_ident'].' в '.$flat['complex_name'].', в котором ';
        if ($flat['flat_apart']=='y') {
            if (rand(0,100)>50) {
                $desc.='находятся';
            }
            else {
                $desc.='расположены';
            }
            $desc.=' апартаменты, ';
        }
        else {
            if (rand(0,100)>50) {
                $desc.='находится';
            }
            else {
                $desc.='расположена';
            }
            $desc.=' квартира, ';
        }

        if ($flat['building_quarter']!='' && $flat['building_start']!='') {
            if ($flat['building_stage']==9 || $flat['building_stage']==11) {
                if ($flat['building_start']<date('Y')) {
                    $desc.='совсем новый, построен в '.$flat['building_start'].' году';
                }
                elseif ($flat['building_start']==date('Y') && ceil(date('n')/3)>=$flat['building_quarter']) {
                    $desc.='совсем новый, построен в '.$flat['building_start'].' году';
                }
                else {
                    $desc.='будет построен в '.$flat['building_start'].' году';
                }
            }
            else {
                $desc.='будет построен в '.$flat['building_start'].' году';
            }
            $desc.='. ';
        }

        if ($flat['build_material_name']!='') {
            $desc.='Дом '.$flat['build_material_name'].', ';
            $desc.='в корпусе ';
            if (count($ss)==1) {
                $desc.='всего один подъезд';
            }
            else {
                $desc.=count($ss). ' '.num2word(count($ss),array('подъезд','подъезда','подъездов'));
            }

            if ($flat['section_liftp']>0 || $flat['section_liftg']>0) {
                $desc.=', ';
                $desc.='есть ';
                if ($flat['section_liftp']>0) {
                    $desc.=$flat['section_liftp'].' '.num2word($flat['section_liftp'],array('пассажирский', 'пассажирских', 'пассажирских'));
                    if ($flat['section_liftg']==0) {
                        $desc.=' '.num2word($flat['section_liftp'],array('лифт', 'лифта', 'лифтов'));
                    }
                }
                if ($flat['section_liftg']>0) {
                    if ($flat['section_liftp']>0) {
                        $desc.=' и ';
                    }
                    $desc.=$flat['section_liftg'].' '.num2word($flat['section_liftg'],array('грузовой лифт', 'грузовых лифта', 'грузовых лифтов'));
                }
            }
            $desc.='.';
        }

        if ($desc!='') {
            $parts_data['BUILDING_SOFT']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {BUILDING_SHORT}
        // Краткое описание корпуса
        //-----------------------------------------------
        $desc='';
        $tmp='';
        // Начало строительства
        if ($flat['flat_new']=='y') {
            if ($flat['building_dev_year']>0 && $flat['building_dev_quarter']>0) {
                $desc.=' Начало строительства - '.$flat['building_dev_quarter'].' квартал '.$flat['building_dev_year'].' года. ';
            }
        }

        // Окончание строительства
        if (isset($flat['building_quarter']) && isset($flat['building_start'])) {
            if ($flat['building_quarter']!='' && $flat['building_start']!='') {
                $tmp=' ';
                $rand=rand(0,90);
                if ($rand<30) {
                    $tmp.='Строительство ';
                }
                elseif ($rand<60) {
                    $tmp.='На сегодняшний день строительство ';
                }
                else {
                    $tmp.='В настоящее время строительство ';
                }
                if (rand(0,100)<50) {
                    $tmp.='завершено';
                }
                else {
                    $tmp.='окончено';
                }
                $tmp.=', дом сдан ';
                if ($flat['building_quarter']==2) {
                    $tmp.='во ';
                }
                else {
                    $tmp.='в ';
                }
                $tmp.=$flat['building_quarter'].' квартале '.$flat['building_start'].' года.';

                if ($flat['building_stage']==9 || $flat['building_stage']==11) {
                    if ($flat['building_start']<date('Y')) {
                        $desc.=$tmp;
                    }
                    elseif ($flat['building_start']==date('Y') && ceil(date('n')/3)==$flat['building_quarter']) {
                        if ($flat['building_stage']==11) {
                            $desc.=$tmp;
                        }
                        else {
                            $desc.=' Строительство завершено, дом сдается в текущем квартале.';
                        }
                        // $desc.=' Строительство завершено, дом сдан.';
                    }
                    elseif ($flat['building_start']==date('Y') && ceil(date('n')/3)>$flat['building_quarter']) {
                        $desc.=$tmp;
                    }
                    else {
                        $desc.=' Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года.';
                    }
                }
                else {
                    $desc.=' Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года.';
                }
                $desc=fix_desc($desc);
            }
        }

        if ($desc!='') {
            $parts_data['BUILDING_SHORT']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {BUILDING_FULL}
        // Максимальное описание корпуса
        //-----------------------------------------------
        $desc='';
        $tmp='';
        // Описание корпуса и секций
        $ss=explode('|',$flat['bld_sections']);

        // Материал дома
        if ($flat['build_material_name']!='') {
            $desc.='Дом '.$flat['build_material_name'];
            switch (count($ss)) {
                case 1: {
                    $desc.=', одноподъездный';
                    break;
                }
                case 2: {
                    $desc.=', двухподъездный';
                    break;
                }
                case 3: {
                    $desc.=', трехподъездный';
                    break;
                }
                case 4: {
                    $desc.=', черырехподъездный';
                    break;
                }
                default: {
                    $desc.=', многоподъездный';
                    break;
                }
            }
            if (count(array_unique($ss))>1) {
                $desc.=', переменной этажности';
                sort($ss);
                $desc.=', от '.$ss[0].' до '.$ss[(count($ss)-1)].' этажей';
            }
            else {
                $desc.=', высотой '.$ss[0].' '.num2word($ss[0],array('этаж','этажа','этажей'));
            }
            $desc.='. ';
        }

        // Наименование секции для фидов
        if ($flat['section_client_name']!='') {
            $flat['section_num']=$flat['section_client_name'];
        }

        if (intval($flat['section_num']) && count($ss)>1) {
            if ($flat['flat_apart']=='y') {
                $desc.='Апартаменты находятся ';
            }
            else {
                $desc.='Квартира находится ';
            }
            if ($flat['section_num']=='2') {
                $desc.='во';
            }
            else {
                $desc.='в';
            }
            $desc.=' '.$flat['section_num'].'-й секции';

            if (count(array_unique($ss))>1) {
                $desc.=' высотой '.$flat['section_levels'].' '.num2word($flat['section_levels'],array('этаж','этажа','этажей'));
            }

            if ($flat['building_ident']!='') {
                $desc.=' в корпусе ';
                // Только для А101
                if ($flat['flat_client']==94 && $flat['building_category']==3) {
                    $desc.='бизнес-класса ';
                }
                $desc.=$flat['building_ident'];
            }

            $desc.='. ';
        }
        else {
            if ($flat['building_ident']!='') {
                if ($flat['flat_apart']=='y') {
                    $tmp.=' Апартаменты находятся в корпусе ';
                }
                else {
                    $tmp.=' Квартира находится в корпусе ';
                }
                $tmp.=$flat['building_ident'];
                $tmp.='. ';
                $desc=$tmp.$desc;
            }
        }

        if ($flat['section_rooms']>0 && $flat['building_no_floor']!=1) {
            $desc.='На этаже '.$flat['section_rooms'].' ';
            $desc.=num2word($flat['section_rooms'],array('квартира', 'квартиры', 'квартир')).'. ';
        }

        if ($flat['section_liftp']>0 || $flat['section_liftg']>0) {
            $desc.='В подъезде ';
            if ($flat['section_liftp']>0) {
                $desc.=$flat['section_liftp'].' '.num2word($flat['section_liftp'],array('пассажирский', 'пассажирских', 'пассажирских'));
                if ($flat['section_liftg']==0) {
                    $desc.=' '.num2word($flat['section_liftp'],array('лифт', 'лифта', 'лифтов')).'. ';
                }
            }
            if ($flat['section_liftg']>0) {
                if ($flat['section_liftp']>0) {
                    $desc.=' и ';
                }
                $desc.=$flat['section_liftg'].' '.num2word($flat['section_liftg'],array('грузовой лифт', 'грузовых лифта', 'грузовых лифтов')).'. ';
            }
        }

        // Начало строительства
        if ($flat['building_dev_year']>0 && $flat['building_dev_quarter']>0) {
            $desc.='Начало строительства - '.$flat['building_dev_quarter'].' квартал '.$flat['building_dev_year'].' года. ';
        }

        // Окончание строительства
        $tmp=' ';
        $rand=rand(0,90);
        if ($rand<30) {
            $tmp.='Строительство ';
        }
        elseif ($rand<60) {
            $tmp.='На сегодняшний день строительство ';
        }
        else {
            $tmp.='В настоящее время строительство ';
        }

        if (rand(0,100)<50) {
            $tmp.='завершено';
        }
        else {
            $tmp.='окончено';
        }
        $tmp.=', дом сдан ';

        if ($flat['building_quarter']==2) {
            $tmp.='во ';
        }
        else {
            $tmp.='в ';
        }
        $tmp.=$flat['building_quarter'].' квартале '.$flat['building_start'].' года. ';

        // Дом сдан
        if ($flat['flat_client']==4 && isset($flat['building_quarter']) && isset($flat['building_start'])) {
            // Для Инвест-строя форму собственности берем из квартиры
            if ($flat['building_quarter']!='' && $flat['building_start']!='') {
                if ($flat['building_stage']==9 || $flat['building_stage']==11) {
                    if ($flat['building_start']<date('Y')) {
                        $desc.=$tmp;
                    }
                    elseif ($flat['building_start']==date('Y') && ceil(date('n')/3)>=$flat['building_quarter']) {
                        $desc.=$tmp;
                    }
                    else {
                        $desc.='Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года. ';
                    }
                }
                else {
                    $desc.=' Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года.';
                }
            }

            switch($flat['flat_own']) {
                case 1: {
                    $desc.='Оформление сделки по договору долевого участия. ';
                    break;
                }
                case 2: {
                    $desc.='Оформление сделки по договору купли-продажи. ';
                    break;
                }
                case 3: {
                    $desc.='Оформление сделки по договору переуступки прав. ';
                    break;
                }
                case 4: {
                    $desc.='Оформление сделки по договору купли-продажи. ';
                    break;
                }
                default: {
                    break;
                }
            }
        }
        elseif (isset($flat['building_quarter']) && isset($flat['building_start'])) {
            if ($flat['building_quarter']!='' && $flat['building_start']!='') {
                if ($flat['building_start']<date('Y')) {
                    if ($flat['building_stage']==9 || $flat['building_stage']==11) {
                        $desc.=$tmp;
                    }
                    else {
                        $desc.=' Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года.';
                    }

                    switch($flat['flat_own']) {
                        case 1: {
                            $desc.='Оформление сделки по договору долевого участия. ';
                            break;
                        }
                        case 2: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        case 3: {
                            $desc.='Оформление сделки по договору переуступки прав. ';
                            break;
                        }
                        case 4: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        default: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                    }
                }
                elseif ($flat['building_start']==date('Y') && ceil(date('n')/3)==($flat['building_quarter'])) {
                    if ($flat['building_stage']==11) {
                        $desc.='Строительство завершено, дом сдается в текущем квартале. ';
                    }
                    else {
                        if ($flat['building_stage']==9) {
                            $desc.=$tmp;
                        }
                        else {
                            $desc.=' Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года.';
                        }
                    }
                    switch($flat['flat_own']) {
                        case 1: {
                            $desc.='Оформление сделки по договору долевого участия. ';
                            break;
                        }
                        case 2: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        case 3: {
                            $desc.='Оформление сделки по договору переуступки прав. ';
                            break;
                        }
                        case 4: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        default: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                    }
                }
                elseif ($flat['building_start']==date('Y') && ceil(date('n')/3)>($flat['building_quarter'])) {
                    if ($flat['building_stage']==9 || $flat['building_stage']==11) {
                        $desc.=$tmp;
                    }
                    else {
                        $desc.=' Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года.';
                    }

                    switch($flat['flat_own']) {
                        case 1: {
                            $desc.='Оформление сделки по договору долевого участия. ';
                            break;
                        }
                        case 2: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        case 3: {
                            $desc.='Оформление сделки по договору переуступки прав. ';
                            break;
                        }
                        case 4: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        default: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                    }
                }
                else {
                    // Магистрат
                    if ($flat['flat_client']==5) {
                        $desc.='Ввод объекта в эксплуатацию запланирован на '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года. ';
                    }
                    else {
                        $desc.='Окончание строительства - '.$flat['building_quarter'].' квартал '.$flat['building_start'].' года. ';
                    }
                    switch($flat['flat_own']) {
                        case 1: {
                            $desc.='Оформление сделки по договору долевого участия. ';
                            break;
                        }
                        case 2: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        case 3: {
                            $desc.='Оформление сделки по договору переуступки прав. ';
                            break;
                        }
                        case 4: {
                            $desc.='Оформление сделки по договору купли-продажи. ';
                            break;
                        }
                        default: {
                            $desc.='Оформление сделки по договору долевого участия. ';
                            break;
                        }
                    }
                }
            }
        }
        if ($desc!='') {
            $parts_data['BUILDING_FULL']=$desc;
        }

        //-----------------------------------------------
        // Блок {METRO_SOFT}
        // Список станций метро
        //-----------------------------------------------
        $desc='';
        $metro_walk=array();
        $metro_turn=array();
        $min_walk=1000;
        $max_walk=0;
        $min_turn=1000;
        $max_turn=0;

        if (isset($flat['complex_metro']) && $flat['complex_metro']>0) {
            $q="SELECT * FROM `@_metro`
                WHERE
                `metro_id`='".$db->escape($flat['complex_metro'])."'
            ";
            $db->query($q, 'desc');
            if ($tmp=$db->fetch_array('desc')) {
                if ($flat['complex_metro_type']=='turn') {
                    $metro_turn[]='«'.$tmp['metro_name'].'»';
                    $min_turn=min($min_turn, $flat['complex_metro_time']);
                    $max_turn=max($max_turn, $flat['complex_metro_time']);
                }
                elseif ($flat['complex_metro_type']=='walk') {
                    $metro_walk[]='«'.$tmp['metro_name'].'»';
                    $min_walk=min($min_walk, $flat['complex_metro_time']);
                    $max_walk=max($max_walk, $flat['complex_metro_time']);
                }
            }
        }
        if (isset($flat['complex_metro2']) && $flat['complex_metro2']>0) {
            $q="SELECT * FROM `@_metro`
                WHERE
                `metro_id`='".$db->escape($flat['complex_metro2'])."'
            ";
            $db->query($q, 'desc');
            if ($tmp=$db->fetch_array('desc')) {
                if ($flat['complex_metro_type2']=='turn') {
                    $metro_turn[]='«'.$tmp['metro_name'].'»';
                    $min_turn=min($min_turn, $flat['complex_metro_time2']);
                    $max_turn=max($max_turn, $flat['complex_metro_time2']);
                }
                elseif ($flat['complex_metro_type2']=='walk') {
                    $metro_walk[]='«'.$tmp['metro_name'].'»';
                    $min_walk=min($min_walk, $flat['complex_metro_time2']);
                    $max_walk=max($max_walk, $flat['complex_metro_time2']);
                }
            }
        }
        if (isset($flat['complex_metro3']) && $flat['complex_metro3']>0) {
            $q="SELECT * FROM `@_metro`
                WHERE
                `metro_id`='".$db->escape($flat['complex_metro3'])."'
            ";
            $db->query($q, 'desc');
            if ($tmp=$db->fetch_array('desc')) {
                if ($flat['complex_metro_type3']=='turn') {
                    $metro_turn[]='«'.$tmp['metro_name'].'»';
                    $min_turn=min($min_turn, $flat['complex_metro_time3']);
                    $max_turn=max($max_turn, $flat['complex_metro_time3']);
                }
                elseif ($flat['complex_metro_type3']=='walk') {
                    $metro_walk[]='«'.$tmp['metro_name'].'»';
                    $min_walk=min($min_walk, $flat['complex_metro_time3']);
                    $max_walk=max($max_walk, $flat['complex_metro_time3']);
                }
            }
        }
        if (isset($flat['complex_metro4']) && $flat['complex_metro4']>0) {
            $q="SELECT * FROM `@_metro`
                WHERE
                `metro_id`='".$db->escape($flat['complex_metro4'])."'
            ";
            $db->query($q, 'desc');
            if ($tmp=$db->fetch_array('desc')) {
                if ($flat['complex_metro_type4']=='turn') {
                    $metro_turn[]='«'.$tmp['metro_name'].'»';
                    $min_turn=min($min_turn, $flat['complex_metro_time4']);
                    $max_turn=max($max_turn, $flat['complex_metro_time4']);
                }
                elseif ($flat['complex_metro_type4']=='walk') {
                    $metro_walk[]='«'.$tmp['metro_name'].'»';
                    $min_walk=min($min_walk, $flat['complex_metro_time4']);
                    $max_walk=max($max_walk, $flat['complex_metro_time4']);
                }
            }
        }
        if (isset($flat['complex_metro5']) && $flat['complex_metro5']>0) {
            $q="SELECT * FROM `@_metro`
                WHERE
                `metro_id`='".$db->escape($flat['complex_metro5'])."'
            ";
            $db->query($q, 'desc');
            if ($tmp=$db->fetch_array('desc')) {
                if ($flat['complex_metro_type5']=='turn') {
                    $metro_turn[]='«'.$tmp['metro_name'].'»';
                    $min_turn=min($min_turn, $flat['complex_metro_time5']);
                    $max_turn=max($max_turn, $flat['complex_metro_time5']);
                }
                elseif ($flat['complex_metro_type5']=='walk') {
                    $metro_walk[]='«'.$tmp['metro_name'].'»';
                    $min_walk=min($min_walk, $flat['complex_metro_time5']);
                    $max_walk=max($max_walk, $flat['complex_metro_time5']);
                }
            }
        }

        // core::pre($flat);
        // core::pre($metro_walk);
        // core::pre($metro_turn);
        // exit;

        if (count($metro_walk)>0 || count($metro_turn)>0) {
            if (count($metro_walk)>0) {
                if (count($metro_walk)>1 && $max_walk>0) {
                    $desc.='До ближайших станций метро ';
                    $i=1;
                    foreach ($metro_walk as $key => $value) {
                        if ($i==count($metro_walk)) {
                            $desc.=' и ';
                        }
                        elseif ($i>1) {
                            $desc.=', ';
                        }
                        $desc.=$value;
                        $i++;
                    }
                    $desc.=' можно добраться пешком всего за ';
                    if ($min_walk!=$max_walk) {
                        $desc.=$min_walk.'-'.$max_walk.' '.num2word($max_walk,array('минута', 'минуты', 'минут')).'. ';
                    }
                    else {
                        $desc.=$max_walk.' '.num2word($max_walk,array('минута', 'минуты', 'минут')).'. ';
                    }
                }
                elseif (count($metro_walk)==1 && $max_walk>0) {
                    $desc.='До ближайшей станции метро ';
                    $desc.=$metro_walk[0].' можно добраться пешком всего за '.$max_walk.' '.num2word($max_walk,array('минута', 'минуты', 'минут')).'. ';
                }
            }
            if (count($metro_turn)>0) {
                if ($max_turn>0) {
                    if ($desc!='') {
                        $desc.='Также за ';

                        if ($min_turn!=$max_turn) {
                            $desc.=$min_turn.'-'.$max_turn.' '.num2word($max_turn,array('минута', 'минуты', 'минут'));
                        }
                        else {
                            $desc.=$max_turn.' '.num2word($max_turn,array('минута', 'минуты', 'минут'));
                        }
                        $desc.=' на общественном транспорте можно доехать до ';
                        if (count($metro_turn)>1) {
                            $desc.='станций метро ';
                            $i=1;
                            foreach ($metro_turn as $key => $value) {
                                if ($i==count($metro_turn)) {
                                    $desc.=' и ';
                                }
                                elseif ($i>1) {
                                    $desc.=', ';
                                }
                                $desc.=$value;
                                $i++;
                            }
                        }
                        else {
                            $desc.='станции метро '.$metro_turn[0];
                        }
                        $desc.='. ';
                    }
                    else {
                        $desc.='До ';
                        if (count($metro_turn)>1) {
                            $desc.='станций метро ';
                            $i=1;
                            foreach ($metro_turn as $key => $value) {
                                if ($i==count($metro_turn)) {
                                    $desc.=' и ';
                                }
                                elseif ($i>1) {
                                    $desc.=', ';
                                }
                                $desc.=$value;
                                $i++;
                            }
                        }
                        else {
                            $desc.='станции метро '.$metro_turn[0];
                        }
                        $desc.=' можно доехать за ';
                        if ($min_turn!=$max_turn) {
                            $desc.=$min_turn.'-'.$max_turn.' '.num2word($max_turn,array('минута', 'минуты', 'минут'));
                        }
                        else {
                            $desc.=$max_turn.' '.num2word($max_turn,array('минута', 'минуты', 'минут'));
                        }
                        $desc.=' на общественном транспорте.';
                    }
                }
            }
        }

        if ($desc!='') {
            $parts_data['METRO_SOFT']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {METRO}
        // Список станций метро
        //-----------------------------------------------
        $desc='';
        $metro=array();
        $metro_add=array();
        $metro_clear=array();

        // Дополнительные станции метро
        if (isset($complex_metro_add) && isset($complex_metro_add[$flat['complex_id']])) {
            $metro_add=$complex_metro_add[$flat['complex_id']];
        }
        else {
            if (isset($flat['complex_metro']) && $flat['complex_metro']>0) {
                $q="SELECT * FROM `@_metro`
                    WHERE
                    `metro_id`='".$db->escape($flat['complex_metro'])."'
                ";
                $db->query($q, 'desc');
                if ($tmp=$db->fetch_array('desc')) {
                    $metro_add[]='«'.$tmp['metro_name'].'»';
                }
            }
            if (isset($flat['complex_metro2']) && $flat['complex_metro2']>0) {
                $q="SELECT * FROM `@_metro`
                    WHERE
                    `metro_id`='".$db->escape($flat['complex_metro2'])."'
                ";
                $db->query($q, 'desc');
                if ($tmp=$db->fetch_array('desc')) {
                    $metro_add[]='«'.$tmp['metro_name'].'»';
                }
            }
            if (isset($flat['complex_metro3']) && $flat['complex_metro3']>0) {
                $q="SELECT * FROM `@_metro`
                    WHERE
                    `metro_id`='".$db->escape($flat['complex_metro3'])."'
                ";
                $db->query($q, 'desc');
                if ($tmp=$db->fetch_array('desc')) {
                    $metro_add[]='«'.$tmp['metro_name'].'»';
                }
            }
            if (isset($flat['complex_metro4']) && $flat['complex_metro4']>0) {
                $q="SELECT * FROM `@_metro`
                    WHERE
                    `metro_id`='".$db->escape($flat['complex_metro4'])."'
                ";
                $db->query($q, 'desc');
                if ($tmp=$db->fetch_array('desc')) {
                    $metro_add[]='«'.$tmp['metro_name'].'»';
                }
            }
            if (isset($flat['complex_metro5']) && $flat['complex_metro5']>0) {
                $q="SELECT * FROM `@_metro`
                    WHERE
                    `metro_id`='".$db->escape($flat['complex_metro5'])."'
                ";
                $db->query($q, 'desc');
                if ($tmp=$db->fetch_array('desc')) {
                    $metro_add[]='«'.$tmp['metro_name'].'»';
                }
            }
            $complex_metro_add[$flat['complex_id']]=$metro_add;
        }

        $bld_m=false;
        if (isset($building_metro) && isset($building_metro[$flat['building_id']])) {
            $metro=$building_metro[$flat['building_id']];
            $metro_clear=$building_metro_clear[$flat['building_id']];
            $bld_m=true;
        }
        elseif (isset($complex_metro) && isset($complex_metro[$flat['complex_id']])) {
            $metro=$complex_metro[$flat['complex_id']];
            $metro_clear=$complex_metro_clear[$flat['complex_id']];
        }
        else {
            if (isset($flat['building_lat']) && isset($flat['building_long']) && $flat['building_lat']!='' && $flat['building_long']!='') {
                $q="SELECT `metro_name`,
                    ROUND(12745.594 *
                        ASIN(
                            SQRT(
                                SIN(RADIANS(".$flat['building_lat']."-`metro_lat`)/2) *
                                SIN(RADIANS(".$flat['building_lat']."-`metro_lat`)/2)
                                +
                                COS(RADIANS(".$flat['building_lat'].")) *
                                COS(RADIANS(`metro_lat`)) *
                                SIN(RADIANS(".$flat['building_long']."-`metro_long`)/2) *
                                SIN(RADIANS(".$flat['building_long']."-`metro_long`)/2)
                            )
                        )
                    ,1)  AS `distance`
                    FROM `@_metro`
                    WHERE `metro_lat`!='' AND `metro_long`!=''
                    HAVING `distance`<2
                    ORDER BY `distance`
                    LIMIT 5
                ";
                $db->query($q, 'desc');
                while($tmp=$db->fetch_array('desc')) {
                    $xx='';
                    $xx.='«'.$tmp['metro_name'].'» (';

                    $metro_clear[]='«'.$tmp['metro_name'].'»';

                    $tmp['distance']=str_replace(',','.',$tmp['distance']);
                    if ($tmp['distance']<1) {
                        $xx.=($tmp['distance']*1000).' м';
                    }
                    else {
                        $xx.=$tmp['distance'].' км';
                    }
                    $xx.=')';
                    $metro[]=$xx;
                }
                $building_metro[$flat['building_id']]=$metro;
                $building_metro_clear[$flat['building_id']]=$metro_clear;
                $bld_m=true;
            }
            else if (isset($flat['complex_lat']) && isset($flat['complex_long']) && $flat['complex_lat']!='' && $flat['complex_long']!='') {
                $q="SELECT `metro_name`,
                    ROUND(12745.594 *
                        ASIN(
                            SQRT(
                                SIN(RADIANS(".$flat['complex_lat']."-`metro_lat`)/2) *
                                SIN(RADIANS(".$flat['complex_lat']."-`metro_lat`)/2)
                                +
                                COS(RADIANS(".$flat['complex_lat'].")) *
                                COS(RADIANS(`metro_lat`)) *
                                SIN(RADIANS(".$flat['complex_long']."-`metro_long`)/2) *
                                SIN(RADIANS(".$flat['complex_long']."-`metro_long`)/2)
                            )
                        )
                    ,1)  AS `distance`
                    FROM `@_metro`
                    WHERE `metro_lat`!='' AND `metro_long`!=''
                    HAVING `distance`<2
                    ORDER BY `distance`
                    LIMIT 5
                ";
                $db->query($q, 'desc');
                while($tmp=$db->fetch_array('desc')) {
                    $xx='';
                    $xx.='«'.$tmp['metro_name'].'» (';

                    $metro_clear[]='«'.$tmp['metro_name'].'»';

                    $tmp['distance']=str_replace(',','.',$tmp['distance']);
                    if ($tmp['distance']<1) {
                        $xx.=($tmp['distance']*1000).' м';
                    }
                    else {
                        $xx.=$tmp['distance'].' км';
                    }
                    $xx.=')';
                    $metro[]=$xx;
                }
            }
            $complex_metro[$flat['complex_id']]=$metro;
            $complex_metro_clear[$flat['complex_id']]=$metro_clear;
        }
        if (count($metro)) {
            $desc.=' В шаговой доступности ';
            if ($bld_m) {
                $desc.='от дома ';
            }
            else {
                $desc.='от жилого комплекса ';
            }
            if (count($metro)==1) {
                $rand=rand(0,30);
                if ($rand<10) {
                    $desc.='имеется';
                }
                elseif ($rand<20) {
                    $desc.='расположена';
                }
                else {
                    $desc.='находится';
                }
                $desc.=' станция метро (расстояние по прямой) '.join(', ',$metro);
            }
            else {
                $rand=rand(0,30);
                if ($rand<10) {
                    $desc.='имеются';
                }
                elseif ($rand<20) {
                    $desc.='расположены';
                }
                else {
                    $desc.='находятся';
                }
                $desc.=' станции метро (расстояние по прямой): '.join(', ',$metro);
            }

            // Повышибать найденные названия метро из дополнительных
            $metro_add=array_diff($metro_add,$metro_clear);
            if (count($metro_add)) {
                $desc.=', также недалеко от этого корпуса ';
                if (count($metro_add)==1) {
                    $rand=rand(0,30);
                    if ($rand<15) {
                        $desc.='расположена';
                    }
                    else {
                        $desc.='находится';
                    }
                    $desc.=' станция метро '.join(', ',$metro_add);
                }
                else {
                    $rand=rand(0,30);
                    if ($rand<15) {
                        $desc.='расположены';
                    }
                    else {
                        $desc.='находятся';
                    }
                    $desc.=' станции метро: '.join(', ',$metro_add);
                }
            }

            $desc.='.';

            $parts_data['METRO']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {COMPLEX_COMMENT}
        // Комментарии из ЖК
        //-----------------------------------------------
        $desc='';
        $comments=array();

        // core::pre($flat);
        // exit;

        if ($flat['complex_comment']!='') {
            $comments[]=$flat['complex_comment'];
        }
        if ($flat['complex_comment2']!='') {
            $comments[]=$flat['complex_comment2'];
        }
        if ($flat['complex_comment3']!='') {
            $comments[]=$flat['complex_comment3'];
        }
        if ($flat['complex_comment4']!='') {
            $comments[]=$flat['complex_comment4'];
        }
        if ($flat['complex_comment5']!='') {
            $comments[]=$flat['complex_comment5'];
        }
        if (count($comments)) {
            shuffle($comments);
            $parts_data['COMPLEX_COMMENT']=$comments[0];
        }

        //-----------------------------------------------
        // Блок {COMPLEX_RULES}
        // Условия продажи из ЖК
        //-----------------------------------------------
        $parts_data['COMPLEX_RULES']=$flat['complex_text'];

        //-----------------------------------------------
        // Блок {BUILDING_COMMENT}
        // Комментарии из корпуса
        //-----------------------------------------------
        $desc='';
        $desc='';
        // Комментарии из корпуса
        $comments=array();
        if ($flat['building_comment']!='') {
            $comments[]=$flat['building_comment'];
        }
        if ($flat['building_comment2']!='') {
            $comments[]=$flat['building_comment2'];
        }
        if ($flat['building_comment3']!='') {
            $comments[]=$flat['building_comment3'];
        }
        if ($flat['building_comment4']!='') {
            $comments[]=$flat['building_comment4'];
        }
        if ($flat['building_comment5']!='') {
            $comments[]=$flat['building_comment5'];
        }
        if (count($comments)) {
            shuffle($comments);
            $parts_data['BUILDING_COMMENT']=$comments[0];
        }

        //-----------------------------------------------
        // Блок {FLAT_TEXT}
        // Текст из карточки квартиры
        //-----------------------------------------------
        if ($flat['flat_text']!='') {
            $parts_data['FLAT_TEXT']=fix_desc($flat['flat_text']);
        }

        //-----------------------------------------------
        // Блок {FLAT_COMMENT}
        // Особенности отделки из карточки квартиры
        //-----------------------------------------------
        if ($flat['flat_comment']!='') {
            $parts_data['FLAT_COMMENT']=fix_desc($flat['flat_comment']);
        }

        //-----------------------------------------------
        // Блок {BANK}
        //-----------------------------------------------
        $desc='';
        $q="SELECT GROUP_CONCAT(DISTINCT `bank_name` ORDER BY `cb_num`, `bank_prime` DESC, `bank_name` SEPARATOR '|') AS `banks`
            FROM `@_complex_bank`, `@_banks`, `@_complex_detail`
            WHERE
            `cb_bank_id`=`bank_id`
            AND `cb_complex_id`=`complex_detail_id`
            AND `complex_complex`='".$db->escape($flat['complex_id'])."'
            AND `complex_client`='".$db->escape($flat['flat_client'])."'
            ORDER BY `bank_prime` DESC
        ";
        $db->query($q, 'desc');
        $tmp=$db->fetch_array('desc');

        // Если банков больше 5, то показать только первые с учетом важности
        if ($tmp['banks']!='') {
            $banks=explode('|',$tmp['banks']);
            $flat['complex_bank']='';
            if (count($banks)>5) {
                for($i=0; $i<5; $i++) {
                    $flat['complex_bank'].=($flat['complex_bank']?', ':'');
                    $flat['complex_bank'].=$banks[$i];
                }
                $flat['complex_bank'].=' и других';
            }
            else {
                $flat['complex_bank']=join(', ',$banks);
            }
        }

        if ($flat['complex_bank']!='') {
            if (strpos($flat['complex_bank'],',')!==false) {
                $desc.=' Аккредитация в банках: '.$flat['complex_bank'].'.';
            }
            else {
                $desc.=' Аккредитация в банке '.$flat['complex_bank'].'.';
            }
        }

        if ($desc!='') {
            $parts_data['BANK']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {CAMPAIGN_SOFT}
        // Краткое описание акций
        //-----------------------------------------------
        $desc='';

        // Цена со скидкой
        if ($flat['flat_price_campaign']>0 && $flat['flat_price_total']>$flat['flat_price_campaign']) {
            $diff=floor(($flat['flat_price_total']-$flat['flat_price_campaign'])/50000)*50000;
            if ($diff>0) {
                $rand=rand(0,30);
                if ($rand<10) {
                    $desc.='Отличное предложение, ';
                }
                elseif ($rand<20) {
                    $desc.='Выгодное предложение, ';
                }
                else {
                    $desc.='Хорошее предложение, ';
                }
                $desc.='квартира продается со скидкой более '.$diff.' рублей';
                $rand=rand(0,30);
                if ($rand<10) {
                    $desc.=' от первоначальной цены';
                }
                elseif ($rand<20) {
                    $desc.=' от начальной цены';
                }
                else {
                    $desc.=' по акционной цене';
                }
                $desc.='.';
            }
        }

        if ($desc!='') {
            $parts_data['CAMPAIGN_SOFT']=trim($desc);
        }

        //-----------------------------------------------
        // Блок {CAMPAIGN_SHORT}
        // Краткое описание акций
        //-----------------------------------------------
        $camp=false;
        $desc='';

        // Цена со скидкой
        if ($flat['flat_price_campaign']>0 && $flat['flat_price_total']>$flat['flat_price_campaign']) {
            if (!$norich) {
                $camp=true;
            }
        }

        // Кампании и акции
        $q="SELECT `@_campaigns`.*
            FROM
                `@_campaign_object`
                , `@_campaigns`
            WHERE
                `co_campaign`=`campaign_id`
            AND
                `campaign_client`='".$flat['flat_client']."'
                AND `campaign_status`=1
                AND (`campaign_start`=0 OR `campaign_start`<".time().")
                AND (`campaign_end`=0 OR `campaign_end`>".time().")
            AND (
                (`co_parent`='".$flat['complex_sale']."' AND `co_type`='sale')
                OR
                (`co_parent`='".$flat['complex_detail_id']."' AND `co_type`='complex')
                OR
                (`co_parent`='".$flat['building_detail_id']."' AND `co_type`='building')
                OR
                (`co_parent`='".$flat['flat_id']."' AND `co_type`='flat')
            )
            GROUP BY `campaign_id`
            ORDER BY `campaign_num`
        ";
        $db->query($q,'gd_tmp');
        if ($db->num_rows('gd_tmp')) {

            $xcamp=array();

            while ($campaign=$db->fetch_array('gd_tmp')) {
                if ($campaign['campaign_no_text']==0) {
                    $xtxt=array();
                    // Приоритет - краткое описание
                    if ($campaign['campaign_short']!='' || $campaign['campaign_short2']!='' || $campaign['campaign_short3']!='' || $campaign['campaign_short4']!='' || $campaign['campaign_short5']!='') {
                        if ($campaign['campaign_short']!='') {
                            $xtxt[]=' '.$campaign['campaign_short'];
                        }
                        if ($campaign['campaign_short2']!='') {
                            $xtxt[]=' '.$campaign['campaign_short2'];
                        }
                        if ($campaign['campaign_short3']!='') {
                            $xtxt[]=' '.$campaign['campaign_short3'];
                        }
                        if ($campaign['campaign_short4']!='') {
                            $xtxt[]=' '.$campaign['campaign_short4'];
                        }
                        if ($campaign['campaign_short5']!='') {
                            $xtxt[]=' '.$campaign['campaign_short5'];
                        }
                    }
                    // Иначе - заголовок акции
                    else {
                        $xtxt[]=' '.$campaign['campaign_name'];
                    }
                    shuffle($xtxt);
                    $txt=' '.$xtxt[0];

                    $xcamp[$campaign['campaign_num']][]=$txt;
                }

                if ($campaign['campaign_percent']!='' || $campaign['campaign_discount']!='') {
                    $camp=true;
                }
            }

            if (count($xcamp)>0) {
                foreach ($xcamp as $xcamps) {
                    shuffle($xcamps);
                    $desc.=join('',$xcamps);
                }
                $desc=fix_desc($desc);
                $has_desc=true;
            }
        }

        if ($camp) {
            if ($flat['flat_price_campaign']>0 && $flat['flat_price_total']>$flat['flat_price_campaign']) {
                if (!$norich) {
                    $desc.=' Стоимость объекта без акционной скидки: '.split_num($flat['flat_price_total']).' '.$flat['currency_text'].',';
                    $desc.=' ваша экономия составит '.split_num($flat['flat_price_total']-$flat['flat_price_campaign']).' '.$flat['currency_text'].'.';
                }
            }
            else {
                $desc.=' Есть скидки, позвоните, расскажем!';
            }
        }

        if (!$no_campaign) {
            if ($desc!='') {
                $parts_data['CAMPAIGN_SHORT']=$desc;
            }
        }

        //-----------------------------------------------
        // Блок {CAMPAIGN_FULL}
        // Максимальное описание акций
        //-----------------------------------------------
        $desc='';
        $camp=false;
        $has_desc=false;

        // Цена со скидкой
        if ($flat['flat_price_campaign']>0 && $flat['flat_price_total']>$flat['flat_price_campaign']) {
            if (!$norich) {
                // Рандомайзер по цене
                $tmp=rand(0,90);
                if ($tmp<30) {
                    $desc.=' Торопитесь';
                }
                elseif ($tmp<60) {
                    $desc.=' Успейте';
                }
                else {
                    $desc.=' Спешите';
                }

                $desc.=' ';

                if (rand(0,100)<50) {
                    $desc.='оформить бронирование';
                }
                else {
                    $desc.='забронировать';
                }

                $tmp=rand(0,100);
                if ($tmp<25) {
                    $desc.=' по этой цене';
                }
                elseif ($tmp<50) {
                    $desc.=' по акционной цене';
                }
                elseif ($tmp<75) {
                    $desc.=', пока действует скидка';
                }
                else {
                    $desc.=' на этих условиях';
                }

                $desc.='! ';

                if (rand(0,100)<50) {
                    $desc.='Предложение ограничено';
                }
                else {
                    if (rand(0,100)<50) {
                        $desc.='Период';
                    }
                    else {
                        $desc.='Срок';
                    }

                    $desc.=' ';

                    if (rand(0,100)<50) {
                        $desc.='предложения';
                    }
                    else {
                        $desc.='акции';
                    }
                    $desc.=' ограничен';
                }

                $desc.='!';

                $desc.=' Стоимость ';
                if ($flat['flat_apart']=='y') {
                    $desc.='апартаментов';
                }
                else {
                    $desc.='квартиры';
                }
                $desc.=' без акционной скидки: '.split_num($flat['flat_price_total']).' '.$flat['currency_text'].',';
                $desc.=' ваша экономия составит '.split_num($flat['flat_price_total']-$flat['flat_price_campaign']).' '.$flat['currency_text'].'.';
                $camp=true;
                $has_desc=true;
            }
        }

        // Кампании и акции
        $q="SELECT `@_campaigns`.*
            FROM
                `@_campaign_object`
                , `@_campaigns`
            WHERE
                `co_campaign`=`campaign_id`
            AND
                `campaign_client`='".$flat['flat_client']."'
                AND `campaign_status`=1
                AND (`campaign_start`=0 OR `campaign_start`<".time().")
                AND (`campaign_end`=0 OR `campaign_end`>".time().")
            AND (
                (`co_parent`='".$flat['complex_sale']."' AND `co_type`='sale')
                OR
                (`co_parent`='".$flat['complex_detail_id']."' AND `co_type`='complex')
                OR
                (`co_parent`='".$flat['building_detail_id']."' AND `co_type`='building')
                OR
                (`co_parent`='".$flat['flat_id']."' AND `co_type`='flat')
            )
            GROUP BY `campaign_id`
            ORDER BY `campaign_num`
        ";
        $db->query($q,'gd_tmp');

        if ($db->num_rows('gd_tmp')) {
            $xcamp=array();

            while ($campaign=$db->fetch_array('gd_tmp')) {
                if ($campaign['campaign_no_text']==0) {
                    $xtxt=array();
                    // Приоритет - краткое описание
                    if ($campaign['campaign_short']!='' || $campaign['campaign_short2']!='' || $campaign['campaign_short3']!='' || $campaign['campaign_short4']!='' || $campaign['campaign_short5']!='') {
                        if ($campaign['campaign_short']!='') {
                            $xtxt[]=' '.$campaign['campaign_short'];
                        }
                        if ($campaign['campaign_short2']!='') {
                            $xtxt[]=' '.$campaign['campaign_short2'];
                        }
                        if ($campaign['campaign_short3']!='') {
                            $xtxt[]=' '.$campaign['campaign_short3'];
                        }
                        if ($campaign['campaign_short4']!='') {
                            $xtxt[]=' '.$campaign['campaign_short4'];
                        }
                        if ($campaign['campaign_short5']!='') {
                            $xtxt[]=' '.$campaign['campaign_short5'];
                        }
                    }
                    // Иначе - заголовок акции
                    else {
                        $xtxt[]=' '.$campaign['campaign_name'];
                    }
                    shuffle($xtxt);
                    $txt=' '.$xtxt[0];

                    if (!$norich) {
                        if (!$camp) {
                            if ($campaign['campaign_percent']!='' || $campaign['campaign_discount']!='') {

                                // Рандомайзер по цене
                                $tmp=rand(0,90);
                                if ($tmp<30) {
                                    $txt.=' Торопитесь';
                                }
                                elseif ($tmp<60) {
                                    $txt.=' Успейте';
                                }
                                else {
                                    $txt.=' Спешите';
                                }

                                $txt.=' ';

                                if (rand(0,100)<50) {
                                    $txt.='оформить бронирование';
                                }
                                else {
                                    $txt.='забронировать';
                                }

                                $tmp=rand(0,100);
                                if ($tmp<25) {
                                    $txt.=' по этой цене';
                                }
                                elseif ($tmp<50) {
                                    $txt.=', пока цены не выросли';
                                }
                                elseif ($tmp<75) {
                                    $txt.=', пока действует скидка';
                                }
                                else {
                                    $txt.=' на этих условиях';
                                }

                                $txt.='! ';

                                if (rand(0,100)<50) {
                                    $txt.='Предложение ограничено';
                                }
                                else {
                                    if (rand(0,100)<50) {
                                        $txt.='Период';
                                    }
                                    else {
                                        $txt.='Срок';
                                    }

                                    $txt.=' ';

                                    if (rand(0,100)<50) {
                                        $txt.='предложения';
                                    }
                                    else {
                                        $txt.='акции';
                                    }
                                    $txt.=' ограничен';
                                }

                                $txt.='!';

                                $txt.=' Стоимость ';
                                if ($flat['flat_apart']=='y') {
                                    $txt.='апартаментов';
                                }
                                else {
                                    $txt.='квартиры';
                                }
                                $txt.=' без акционной скидки: '.split_num($flat['flat_price_total']).' '.$flat['currency_text'].'.';

                                // $desc.=' ваша экономия составит '.split_num($flat['flat_price_total']-$flat['flat_price_campaign']).' '.$flat['currency_text'].'.';
                                $camp=true;
                            }
                        }
                    }

                    $xcamp[$campaign['campaign_num']][]=$txt;
                }
            }

            if (count($xcamp)>0) {
                foreach ($xcamp as $xcamps) {
                    shuffle($xcamps);
                    $desc.=join('',$xcamps);
                }
                $desc=fix_desc($desc);
                $has_desc=true;
            }
        }

        if ($has_desc) {
            // Рандомайзер по звонкам
            $desc.=' <strong>';

            $tmp=rand(0,90);
            if ($tmp<30) {
                $desc.='По всем вопросам ';
                if (rand(0,100)<50) {
                    $desc.='обращайтесь';
                }
                else {
                    $desc.='звоните';
                }
                $desc.=' в офис продаж';
            }
            elseif ($tmp<60) {
                $desc.='Звоните';
            }
            else {
                $desc.='Информация по телефону';
            }

            $desc.=', ';

            if (rand(0,100)<50) {
                $desc.='мы вам все подробно расскажем';
            }
            else {
                $desc.='наши менеджеры вам все расскажут';
            }
            $desc.='!';

            $desc.='</strong> ';
            $desc=fix_desc($desc);
        }

        if (!$no_campaign) {
            if ($desc!='') {
                $parts_data['CAMPAIGN_FULL']=trim($desc);
            }
        }

        //-----------------------------------------------
        // Блок {COMMERCE}
        // Коммерческая недвижимость
        //-----------------------------------------------
        if ($flat['flat_commerce']!=0) {
            $desc='';

            switch($flat['flat_commerce']) {
                case '1': {
                    if ($flat['flat_room_total']>100) {
                        if (rand(0,100)<50) {
                            $desc.='Просторное';
                        }
                        else {
                            $desc.='Большое';
                        }
                        if (rand(0,100)<50) {
                            $desc.=' офисное помещение';
                        }
                        else {
                            $desc.=' помещение под офис';
                        }
                    }
                    else {
                        if (rand(0,100)<50) {
                            $desc.='Офисное помещение';
                        }
                        else {
                            $desc.='Помещение под офис';
                        }
                    }
                    break;
                }
                case '2': {
                    if ($flat['flat_room_total']>20) {
                        $desc.='Складское помещение';
                    }
                    else {
                        if (rand(0,100)<50) {
                            $desc.='Кладовое помещение';
                        }
                        else {
                            $desc.='Кладовая';
                        }
                    }
                    break;
                }
                case '3': {
                    $desc.='Торговое помещение';
                    break;
                }
                case '4': {
                    $desc.='Помещение общественного питания';
                    break;
                }
                case '5': {
                    $desc.='Помещение свободного назначения';
                    break;
                }
                case '7': {
                    $desc.='Помещение автосервиса';
                    break;
                }
                case '8': {
                    $desc.='Производственное помещение';
                    break;
                }
                case '9': {
                    $desc.='Отдельно стоящее здание';
                    break;
                }
                case '10': {
                    $desc.='Юридический адрес';
                    break;
                }
                case '11': {
                    $desc.='Готовый бизнес';
                    break;
                }
                case '12': {
                    $desc.='Помещение под бытовые услуги';
                    break;
                }
                case '13': {
                    $desc.='Гостиница';
                    break;
                }
                case '15': {
                    if ($flat['flat_room_total']>14) {
                        if (rand(0,100)<50) {
                            $desc.='Просторное';
                        }
                        else {
                            $desc.='Большое';
                        }
                        if ($flat['flat_pair']==1) {
                            $desc.=' сдвоенное';
                        }
                        $desc.=' машиноместо';
                    }
                    else {
                        $desc.='Машиноместо';
                    }
                    break;
                }
                default: {
                    $desc.='Помещение';
                    break;
                }
            }

            // Машиноместа
            if ($flat['flat_commerce']==15) {
                $desc.=' на '.$flat['flat_level'].' уровне';
                if ($flat['flat_level']<0) {
                    $desc.=' подземного паркинга';
                }
                else {
                    $desc.=' наземного паркинга';
                }
                $desc.=' в '.$flat['complex_name'];
                $desc.=', общая площадь '.$flat['flat_room_total'].' кв.м. ';

                $rand=rand(0,100);
                if ($rand<33) {
                    $desc.='Теплый паркинг';
                }
                elseif ($rand<66) {
                    $desc.='Паркинг с отоплением';
                }
                else {
                    $desc.='Отапливаемый паркинг';
                }
                $desc.=', ';

                $tmp=array();
                if (rand(0,100)<50) {
                    $tmp[]='круглосуточная охрана';
                }
                else {
                    $tmp[]='охраняется 24/7';
                }

                if (rand(0,100)<50) {
                    $tmp[]='установлено видеонаблюдение';
                }
                else {
                    $tmp[]='система видеонаблюдения';
                }

                if (rand(0,100)<50) {
                    $tmp[]='пожарная сигнализация';
                }
                else {
                    $tmp[]='противопожарная система';
                }

                if (rand(0,100)<50) {
                    $tmp[]='оборудована вентиляция';
                }
                else {
                    $tmp[]='система вентиляции';
                }

                if (rand(0,100)<50) {
                    $tmp[]='автоматические ворота с шлагбаумом';
                }
                else {
                    $tmp[]='автоматические ворота и шлагбаум на въезд';
                }

                if ($flat['flat_level']<0) {
                    if (rand(0,100)<50) {
                        $tmp[]='лифт из подъезда';
                    }
                    else {
                        $tmp[]='спуск в паркинг на лифте';
                    }
                }

                shuffle($tmp);
                $desc.=join(', ',$tmp).'. ';

                if (rand(0,100)<50) {
                    $desc.='Доступ 24 часа в сутки.';
                }
                else {
                    $desc.='Круглосуточный доступ.';
                }

                if ($flat['flat_height']>2.9) {
                    $desc.=' Высота потолков '.$flat['flat_height'].' м., ';
                    if (rand(0,100)<50) {
                        $desc.='поэтому машиноместо ';
                        if (rand(0,100)<50) {
                            $desc.='отлично';
                        }
                        else {
                            $desc.='идеально';
                        }
                        $desc.=' подойдет для высоких автомобилей.';
                    }
                    else {
                        $desc.=' можно разместить большой автомобиль.';
                    }
                }
                if ($flat['flat_pair']==1) {
                    if (rand(0,100)<50) {
                        if (rand(0,100)<50) {
                            $desc.=' Сдвоенное ';
                        }
                        else {
                            $desc.=' Спаренное ';
                        }
                        if (rand(0,100)<50) {
                            $desc.='"семейное" ';
                        }
                        $desc.='машиноместо ';

                        if (rand(0,100)<50) {
                            $desc.='будет удобно ';
                        }
                        else {
                            $desc.='подходит ';
                        }
                    }
                    else {
                        $desc.=' Блок из двух машиномест ';
                    }
                    if (rand(0,100)<50) {
                        $desc.='будет удобен ';
                    }
                    else {
                        $desc.='подойдет ';
                    }
                    $desc.='для семьи с ';
                    if (rand(0,100)<50) {
                        $desc.='двумя ';
                    }
                    else {
                        $desc.='несколькими ';
                    }
                    if (rand(0,100)<50) {
                        $desc.='автомобилями';
                    }
                    else {
                        if (rand(0,100)<50) {
                            $desc.='машинами';
                        }
                        else {
                            $desc.='авто';
                        }
                    }
                    $desc.='.';
                }

                if ($flat['flat_room_total']>14) {
                    $desc.=' Большая площадь ';
                    if (rand(0,100)<50) {
                        $desc.='машиноместа ';
                    }
                    $desc.='обеспечивает ';
                    if (rand(0,100)<50) {
                        $desc.='комфортный доступ к автомобилю при ';
                        if (rand(0,100)<50) {
                            $desc.='погрузке или высадке пассажиров.';
                        }
                        else {
                            $desc.='открытии дверей и багажника.';
                        }
                    }
                    else {
                        $desc.='удобство заезда и выезда даже для габаритных автомобилей.';
                    }
                }
            }
            // кладовые
            elseif ($flat['flat_commerce']==2) {
                $desc.=' на '.$flat['flat_level'].' уровне';
                $desc.=' в '.$flat['complex_name'];
                $desc.=', общая площадь '.$flat['flat_room_total'].' кв.м. ';
            }
            elseif ($flat['flat_commerce']!=9) {
                $desc.=' на '.$flat['flat_level'].' этаже';
                $desc.=', общая площадь '.$flat['flat_room_total'].' кв.м.';
            }
            else {
                $desc.=', общая площадь '.$flat['flat_room_total'].' кв.м.';
            }

            if ($flat['flat_commerce']!=15 && $flat['flat_commerce']!=2) {
                if ($flat['flat_height']!='') {
                    $desc.=', высота потолков '.$flat['flat_height'].' м.';
                }
                if ($flat['flat_decor']!=0) {
                    if ($flat['flat_decor']=='1') {
                        $desc.=', без отделки';
                    }
                    else {
                        $desc.=', с отделкой';
                    }
                    $desc.='.';
                }

                if ($flat['flat_entry']=='1') {
                    $desc.=' Оборудован отдельный вход';
                    if ($flat['flat_free_entry']=='1') {
                        $desc.=' с пропускной системой доступа.';
                    }
                    else {
                        $desc.=' со свободным доступом.';
                    }
                }
                else {
                    if ($flat['flat_free_entry']=='1') {
                        if (rand(0,100)<50) {
                            $desc.=' Пропускная система доступа.';
                        }
                        else {
                            $desc.=' Система контроля доступа.';
                        }
                    }
                }
            }

            if ($flat['flat_commerce']!=15) {
                if ($flat['flat_ventilation']!=0 || $flat['flat_heating']!=0 || $flat['flat_fire']!=0) {
                    $desc.=' В помещении ';
                    if ($flat['flat_ventilation']=='1') {
                        $desc.='работает система вентиляции';
                    }
                    if ($flat['flat_heating']=='1') {
                        if ($flat['flat_ventilation']=='1') {
                            $desc.=' и отопления';
                        }
                        else {
                            $desc.='имеется система отопления';
                        }
                    }
                    if ($flat['flat_fire']=='1') {
                        if ($flat['flat_ventilation']!=0 || $flat['flat_heating']!=0) {
                            $desc.=', ';
                        }
                        $desc.='подключена система пожаротушения';
                    }
                    $desc.='. ';
                }
            }

            if ($flat['flat_commerce']!=2) {
                if ($flat['flat_electro']!='') {
                    $desc.='Мощность подведенной линии электроснабжения '.$flat['flat_electro'].' кВт. ';
                }
            }

            // кладовая
            if ($flat['flat_commerce']==2) {
                if (rand(0,100)<50) {
                    $desc.='Кладовая';
                }
                else {
                    $desc.='Кладовое помещение';
                }

                if (rand(0,100)<50) {
                    $desc.=' отлично';
                }
                else {
                    $desc.=' прекрасно';
                }
                $desc.=' подойдет для хранения ';

                $tmp=array();
                $tmp[]='инструментов';

                if (rand(0,100)<50) {
                    $tmp[]='шин';
                }
                else {
                    $tmp[]='автомобильной резины';
                }
                if (rand(0,100)<50) {
                    $tmp[]='спортивного снаряжения';
                }
                else {
                    $tmp[]='спортивного инвентаря';
                }
                if (rand(0,100)<50) {
                    $tmp[]='зaпaсов продуктов';
                }
                else {
                    $tmp[]='зaпaса продуктов';
                }
                if (rand(0,100)<50) {
                    $tmp[]='детских кoляcок';
                    $tmp[]='санок';
                }
                else {
                    $tmp[]='детских санок';
                    $tmp[]='кoляcок';
                }
                if (rand(0,100)<50) {
                    $tmp[]='заготовок на зиму';
                }
                else {
                    $tmp[]='домашних заготовок';
                }
                shuffle($tmp);
                $desc.=join(', ',$tmp);

                if (rand(0,100)<50) {
                    $desc.=' и ';
                }
                else {
                    $desc.=', а также ';
                }
                if (rand(0,100)<50) {
                    $desc.='других ';
                }
                else {
                    $desc.='прочих ';
                }
                $desc.='вещей, ';

                if (rand(0,100)<50) {
                    $desc.='которым ';
                    if (rand(0,100)<50) {
                        $desc.='в квартире обычно не хватает места';
                    }
                    else {
                        $desc.='обычно не хватает места в квартире';
                    }
                }
                else {
                    $desc.='которые ';
                    if (rand(0,100)<50) {
                        $desc.='неудобно складировать в квартире';
                    }
                    else {
                        $desc.='в квартире складировать неудобно';
                    }
                }
                $desc.='.';

                if ($flat['flat_level']<0) {
                    if (rand(0,100)<50) {
                        $desc.=' До кладовой можно спуститься из подъезда.';
                    }
                    else {
                        $desc.=' Cпуск до кладовой из подъезда.';
                    }
                }
                if ($flat['flat_height']>2.9) {
                    if (rand(0,100)<50) {
                        $desc.=' Высокие потолки';
                    }
                    else {
                        $desc.=' Потолки высотой';
                    }

                    $desc.=' '.$flat['flat_height'].' м. ';
                    $desc.='позволяют ';
                    if (rand(0,100)<50) {
                        if (rand(0,100)<50) {
                            $desc.='максимально ';
                        }
                        else {
                            $desc.='эффективно ';
                        }
                        $desc.='использовать ';
                        if (rand(0,100)<50) {
                            $desc.='пространство';
                        }
                        else {
                            $desc.='полезную площадь';
                        }

                        $desc.=' для хранения';
                    }
                    else {
                        $desc.='использовать пространство для ';
                        if (rand(0,100)<50) {
                            $desc.='установки ';
                        }
                        else {
                            $desc.='размещения ';
                        }
                        if (rand(0,100)<50) {
                            $desc.='полок';
                        }
                        else {
                            $desc.='стеллажей';
                        }
                    }
                    $desc.='.';
                }
            }

            // офисное помещение
            if ($flat['flat_commerce']==1) {
                if ($flat['flat_freeplan']=='y') {
                    if (rand(0,100)<50) {
                        $desc.=' Гибкие планировочные решения';
                        $desc.=' за счет свободной планировки';
                    }
                    else {
                        if (rand(0,100)<50) {
                            if (rand(0,100)<50) {
                                $desc.='Продуманная';
                            }
                            else {
                                $desc.='Правильная';
                            }
                            $desc.=' конфигурация помещения';
                            $desc.=' и свободная планировка';
                        }
                        else {
                            if (rand(0,100)<50) {
                                $desc.='Эргономичная';
                            }
                            else {
                                $desc.='Продуманная';
                            }
                            $desc.=' свободная планировка и конфигурация помещения';
                        }
                    }
                    if (rand(0,100)<50) {
                        $desc.=' позволят';
                    }
                    else {
                        $desc.=' позволяют';
                    }

                    if (rand(0,100)<50) {
                        $desc.=' максимально';
                    }
                    if (rand(0,100)<50) {
                        $desc.=' функционально';
                    }
                    else {
                        $desc.=' удобно';
                    }
                    $desc.=' обеспечить';
                    if (rand(0,100)<50) {
                        if (rand(0,100)<50) {
                            $desc.=' рабочее';
                        }
                        $desc.=' пространство';
                        if (rand(0,100)<50) {
                            $desc.=' для сотрудников';
                        }
                    }
                    else {
                        $desc.=' пространство для работы';
                        if (rand(0,100)<50) {
                            $desc.=' сотрудников';
                        }
                    }
                    $desc.='.';
                }
                else {
                    $desc.=' Традиционная планировка';
                    if (rand(0,100)<50) {
                        $desc.=' офиса';
                    }
                    else {
                        $desc.=' офисного помещения';
                    }
                    if (rand(0,100)<50) {
                        $desc.=' помогает';
                    }
                    else {
                        $desc.=' позволяет';
                    }

                    $tmp=array();
                    $tmp[]='поддерживать конфиденциальность';
                    $tmp[]='сосредоточиться на работе';
                    $tmp[]='создавать многоцелевые рабочие пространства';
                    shuffle($tmp);
                    $desc.=' '.join(', ',$tmp);

                    $desc.='.';
                }

                if ($flat['flat_sus']>0 || $flat['flat_sur']>0) {
                    if (rand(0,100)<50) {
                        $desc.=' Собственные инженерные системы';
                    }
                    else {
                        $desc.=' Наличие мокрых точек';
                    }
                    $desc.=' в помещении';
                    if (rand(0,100)<50) {
                        $desc.=' делают возможным';
                    }
                    else {
                        $desc.=' дают возможность';
                    }
                    $desc.=' с комфортом организовать';
                    if (rand(0,100)<50) {
                        $desc.=' бизнес';
                    }
                    else {
                        $desc.=' рабочий процесс';
                    }
                    $desc.='.';
                }

                if ($flat['flat_room_total']>100) {
                    if (rand(0,100)<50) {
                        $desc.=' Офис спроектирован';
                    }
                    else {
                        $desc.=' Офисное помещение спроектировано';
                    }
                    if (rand(0,100)<50) {
                        if (rand(0,100)<50) {
                            $desc.=' с большими окнами';
                        }
                        else {
                            $desc.=' с большой площадью остекления';
                        }
                        $desc.=' для обеспечения';
                        if (rand(0,100)<50) {
                            $desc.=' максимальной';
                        }
                        else {
                            $desc.=' хорошей';
                        }
                        $desc.=' инсоляции';
                    }
                    else {
                        $desc.=' с учетом';
                        if (rand(0,100)<50) {
                            $desc.=' создания максимального';
                        }
                        else {
                            $desc.=' максимально комфортного';
                        }
                        $desc.=' освещения';
                    }
                    $desc.='.';
                }

                if ($flat['flat_height']>2.9) {
                    if (rand(0,100)<50) {
                        $desc.=' Высокие потолки';
                    }
                    else {
                        $desc.=' Потолки высотой';
                    }

                    $desc.=' '.$flat['flat_height'].' м. ';
                }
                elseif ($flat['flat_height']>0) {
                    $desc.=' Высота потолков';
                    $desc.=' '.$flat['flat_height'].' м. ';
                }
            }

            $desc=fix_desc($desc);
            if ($desc!='') {
                $parts_data['COMMERCE']=trim($desc);
            }
        }

        //------------------------------------------------------------
        // Агентство
        //------------------------------------------------------------
        if ($flat['flat_client']==256) {
            // Использовать свои тексты
            if ($flat['flat_use_own']==1 && $flat['flat_desc']!='') {
                return $flat['flat_desc'];
            }

            if ($template=='') {
                $template='';
                $template.='{CAMPAIGN_SOFT} {FLAT_SOFT}'."\n\n";
                $template.='{BUILDING_SOFT}'."\n\n";
                $template.='{COMPLEX_COMMENT}'."\n\n";
                $template.='{METRO_SOFT}';

                // if ($flat['flat_new']=='y') {
                //     $template.=' Возможна ипотека, рассрочка.';
                // }
            }
        }
        //------------------------------------------------------------
        // Все остальные клиенты
        //------------------------------------------------------------
        else {
            // Использовать свои тексты
            if ($avito && $flat['flat_text_alt']!='') {
                return $flat['flat_text_alt'];
            }

            // Использовать свои тексты
            if (($flat['complex_use_own']==1 || $flat['flat_use_own']==1) && $flat['flat_desc']!='') {
                return $flat['flat_desc'];
            }

            // Использовать свои тексты
            if ($flat['flat_id']==721992) {
                return $flat['flat_desc'];
            }

            // Коммерческая недвижка - свои тексты + акции
            if ($flat['flat_commerce']!=0) {
                if ($template=='') {
                    $template='';
                    $template.='{COMMERCE}'."\n\n";
                    $template.='{FLAT_TEXT}'."\n\n";
                    $template.='{FLAT_COMMENT}'."\n\n";
                    $template.='{BUILDING_COMMENT}'."\n\n";
                    $template.='{COMPLEX_COMMENT}'."\n\n";
                    $template.='{CAMPAIGN_SHORT}';
                }
            }
            else {
                if ($template=='') {
                    $template='';
                    $template.='{CAMPAIGN_FULL}'."\n\n";
                    $template.='{FLAT_FULL}'."\n\n".'{DECOR_FULL}'."\n\n";
                    $template.='{FLAT_COMMENT}'."\n\n";
                    $template.='{BUILDING_COMMENT}'."\n\n";
                    $template.='{BUILDING_FULL}'."\n\n";
                    $template.='{FLAT_TEXT}'."\n\n";
                    $template.='{METRO}'."\n\n";
                    $template.='{COMPLEX_COMMENT}'."\n\n";
                    $template.='{BANK}';
                }
            }
        }

        // core::pre($template);
        // exit;

        //-----------------------------------------------
        // Собрать описание по шаблону
        //-----------------------------------------------

        foreach ($parts_names as $name) {
            if (isset($parts_data[$name]) && trim($parts_data[$name])!='' && strpos($template, '{'.$name.'}')!==false) {
                // core::pre('----------------------------');
                // core::pre($name);
                // core::pre($template);
                // core::pre('----------------------------');
                $template=str_replace('{'.$name.'}',trim($parts_data[$name]),$template);
                // core::pre($template);
            }
        }

        // core::pre($template);
        // exit;

        $template=trim(preg_replace('/\r/is','',$template));
        $template=trim(preg_replace('/\{[_A-Z]+\}/is','',$template));
        $template=trim(preg_replace('/ +/is',' ',$template));
        $template=trim(preg_replace('/\n /is',"\n",$template));
        $template=trim(preg_replace('/\n{2,}/is',"\n\n",$template));
        $desc=$template;
        $desc=fix_desc($desc);

        if (strpos(getenv('REQUEST_URI'), 'avito')!==false || strpos(getenv('REQUEST_URI'), 'api.php')!==false) {
            $desc=nl2br($desc);
            $desc=trim(str_replace("\r",'',$desc));
            $desc=trim(str_replace("\n",'',$desc));
        }
        else {
            $desc=strip_tags($desc);
        }
    }
    return $desc;
}

function num2word2($num) {
    $r_names=Array("девятьсот", "восемьсот", "семьсот", "шестьсот", "пятьсот", "четыреста", "триста", "двести", "сто",
             "девяносто", "восемьдесят", "семьдесят", "шестьдесят", "пятьдесят", "сорок", "тридцать", "двадцать",
             "девятнадцать", "восемнадцать", "семнадцать", "шестнадцать", "пятнадцать", "четырнадцать", "тринадцать", "двенадцать", "одиннадцать", "десять",
             "девять", "восемь", "семь", "шесть", "пять", "четыре", "три", "два", "один");
    $r_summ=Array(900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1);
    if ($num==0) {
        return ("ноль ");
    }
    $words="";
    while ($num>0) {
        for ($i=0; $i<count($r_summ); $i++) {
            if ($num>=$r_summ[$i]) {
                $words.=$r_names[$i]." ";
                $num=$num-$r_summ[$i];
                break;
            }
        }
    }
    return ($words);
}

/**
 * Функция вывода склонения числительного
 * @param  integer $n     число для выбора склонения
 * @param  array   $words набор слов для склонения
 * @return string
 */
function num2word($n,$words) {
    return($words[($n=($n=$n%100)>19?($n%10):$n)==1?0 : (($n>1&&$n<=4)?1:2)]);
}
