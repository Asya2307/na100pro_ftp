<?
/**
 * Отдельная квартира
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

// Подключить парсер шаблонов
$tpl = new parser (ROOT_DIR.'templates');
$tpl->set_template('main_offer.html');

$content->add_meta('title','Квартиры в продаже');

// Список скрываемых ЖК
if (isset($user['user_total_ignore'])) {
    $user_total_ignore=explode(',',$user['user_total_ignore']);
}
else {
    $user_total_ignore=array();
}
$user_total_ignore[]='0_0';

$clients=array();
$clients[]=$user['user_client'];
$clients=$TOTAL_CLIENTS;

$fcomplex=(isset($_GET['fcomplex'])?intval($_GET['fcomplex']):0);
$limit=(isset($_GET['limit'])?intval($_GET['limit']):10);
if ($limit!=10 && $limit!=20 && $limit!=100) {
    $limit=10;
}
$p=isset($_GET['p'])?intval($_GET['p']):0;
$id=isset($_GET['id'])?intval($_GET['id']):0;

// Агенты, которые также продают этого застройщика
$q="SELECT `complex_detail_id`, `complex_complex`, `complex_name`
    FROM `@_complex_detail`, `@_complex`
    WHERE
    `complex_client` IN (".join(',',$clients).")
";
foreach($user_total_ignore as $data) {
    $tmp=explode('_',$data);
    $q.=" AND NOT (`complex_complex`='".$tmp[0]."' AND `complex_client`='".$tmp[1]."')";
}
$q.=" AND `complex_complex`=`complex_id`";
$db->query($q);
$complex=array();
if ($db->num_rows()) {
    // Список жилых комплексов, которые продает основной клиент
    while($tmp=$db->fetch_array()) {
        $complex[$tmp['complex_detail_id']]=$tmp['complex_complex'];
    }
    if (count($complex)) {
        // Корпуса
        $buildings=array();
        $client_replace=array();

        // Корпуса основного клиента
        $q="SELECT
            `building_detail_id`
            FROM
            `@_buildings_detail`
            WHERE
            `building_client` IN (".join(',',$clients).")
        ";
        $db->query($q,1);
        while($building=$db->fetch_array(1)) {
            $buildings[]=$building['building_detail_id'];
        }

        // Корпуса агентов
        $q="SELECT
            `cl1`.`client_name` as `real_client_name`, `cl2`.`client_name`, `cl2`.`client_id`, `complex_name`, `complex_id`
            FROM
            `@_agent_complex`
            , `@_clients` as `cl1`
            , `@_clients` as `cl2`
            , `@_complex`
            , `@_complex_detail` as `cd1`
            , `@_complex_detail` as `cd2`
            WHERE
            `ac_complex_id` IN (".join(',',array_keys($complex)).")
            AND `ac_complex_id`=`cd1`.`complex_detail_id`
            AND `ac_client_id`=`cl2`.`client_id`
            AND `cd1`.`complex_complex`=`cd2`.`complex_complex`
            AND `cd1`.`complex_client`=`cl1`.`client_id`
            AND `complex_id`=`cd2`.`complex_complex`
            AND `cd2`.`complex_client`=`cl2`.`client_id`
        ";
        $db->query($q);
        while ($tmp=$db->fetch_array()) {
            // core::pre($tmp);

            $clients[]=$tmp['client_id'];

            // Список корпусов
            $q="SELECT
                `building_detail_id`
                FROM
                `@_buildings`, `@_buildings_detail`
                WHERE
                `@_buildings_detail`.`building_building`=`building_id`
                AND `building_complex`='".$tmp['complex_id']."'
                AND `building_client`='".$tmp['client_id']."'
            ";
            $db->query($q,1);
            while($building=$db->fetch_array(1)) {
                $buildings[]=$building['building_detail_id'];
                $client_replace[$building['building_detail_id']]=$tmp['real_client_name'];
            }
        }
    }
}

$add='';
if ($fcomplex!=0) {
    $add.='\x26fcomplex='.$fcomplex;
}
if ($p!=10) {
    $add.='\x26p='.$p;
}
if ($limit!=10) {
    $add.='\x26limit='.$limit;
}

// Список квартир клиента с примененным фильтром
$q="SELECT * FROM `@_flats`
        LEFT JOIN `@_sections` ON `flat_section`=`section_id`
        LEFT JOIN `@_currency` ON `flat_currency`=`currency_id`
        LEFT JOIN `@_packs` ON `flat_pack`=`pack_id`
        LEFT JOIN `@_flat_decors` ON `flat_decor`=`flat_decor_id`
        LEFT JOIN `@_flat_windows` ON `flat_window`=`flat_window_id`
        LEFT JOIN `@_flat_floors` ON `flat_floor`=`flat_floor_id`
        LEFT JOIN `@_flat_rooms` ON `flat_type`=`flat_room_id`
        LEFT JOIN `@_flat_renovations` ON `flat_repair`=`flat_renovation_id`
        LEFT JOIN `@_flat_quality` ON `flat_quality`=`flat_quality_id`
    , `@_buildings`
    , `@_buildings_detail`
    , `@_complex_detail`
    , `@_complex`
    WHERE
    `building_complex`=`complex_complex`
    AND `flat_status`=0
    AND `flat_commerce`=0
    AND `complex_id`=`complex_complex`
    AND `@_buildings_detail`.`building_building`=`building_id`
    AND `flat_building`=`building_detail_id`
    AND `flat_client`=`complex_client`
    AND `flat_id`='".$db->escape($id)."'
    AND `building_client` IN (".join(',',$clients).")
    LIMIT 1
";
$db->query($q);
$data=$db->fetch_array();

// core::pre($data);
// exit;

if ($data['section_levels']=='' && $data['flat_new']=='n') {
    $data['section_levels']=$data['flat_level_total'];
}
if ($data['section_num']=='' && $data['flat_new']=='n') {
    $data['section_num']='б/с';
}

// Рассрочка и ипотека из корпусов
if (isset($data['building_deferred']) && $data['building_deferred']=='y') {
    $data['flat_deferred']='y';
}
if (isset($data['building_mortgage']) && $data['building_mortgage']=='y') {
    $data['flat_mortgage']='y';
}

if ($data) {
    // Все квартиры или конкретный ЖК
    if ($fcomplex!=0) {
        $content->add_meta('title','Квартиры в продаже');
    }
    else {
        $content->add_meta('title',$data['complex_name']);
    }
    $content->add_meta('title',$data['flat_head']);


    if ($data['flat_price_campaign']>0) {
        $tpl->parse_block('flat_price2', array(
            'PRICE2'=>split_num($data['flat_price_campaign']),
        ), true);
    }
}
else {
    // Объявление не найдено
    if ($add!='') {
        header('Location: /index.php?page=flats'.str_replace('\x26','&',$add));
        exit;
    }
    else {
        header('Location: /');
        exit;
    }
}

// Предвыборка сервисов
$services=array();
$q="SELECT * FROM `@_services`, `@_packs_services` WHERE
    `service_active`='y'
    AND `service_hide`=0
    AND (`service_parent`=0 OR `service_child`=1 OR `service_auto`=1)
    AND `ps_service_id`=`service_id`
    AND `ps_pack_id`='".$data['flat_pack']."'
    ORDER BY `service_name`";
$db->query($q);
while($tmp=$db->fetch_array()) {
    $services[$tmp['service_feed']]=$tmp['service_name'];
}

// Размещение на площадках
$q="SELECT `@_flats_urls`.*, `sale_id`, `service_name`, `service_id`, `service_feed`, `sale_phone`, `sale_fake`
    FROM
    `@_flats_urls`
    , `@_flats`
    , `@_services`
    , `@_buildings_detail`
    , `@_buildings`
    , `@_complex_detail`
    , `@_complex`
    , `@_sales`
    WHERE
    `service_id`=`fu_service_id`
    AND `fu_flat_id`='".$db->escape($id)."'
    AND `flat_id`='".$db->escape($id)."'
    AND `fu_url`!='' AND `fu_url` IS NOT NULL
    AND `flat_building`=`building_detail_id`
    AND `@_buildings_detail`.`building_building`=`building_id`
    AND `@_complex_detail`.`complex_complex`=`complex_id`
    AND `building_complex`=`complex_id`
    AND `sale_id`=`complex_sale`
    ORDER BY `service_name`
";
$db->query($q);

$xserv=array();
$zserv=array();

$xcnt=0;

if ($db->num_rows()) {
    while($tmp=$db->fetch_array()) {
        //core::pre($tmp);
        $x=explode('(',$tmp['service_name']);
        $service_name=trim($x[0]);

        if (in_array($service_name, $xserv)) { continue; }
        $xserv[]=$service_name;

        $x=explode('_',$tmp['service_feed']);
        $service_feed=trim($x[0]);

        // Альтернативный телефон, в том числе и для дочерних сервисов
        $q="SELECT * FROM `@_trans`
            WHERE
            `trans_type`='phone'
            AND `trans_parent`='".$db->escape($tmp['sale_id'])."'
            AND `trans_target`='".$db->escape($service_feed)."'";
        $db->query($q,1);
        if ($db->num_rows(1)) {
            $x=$db->fetch_array(1);
            $tmp['sale_phone']=$x['trans_value'];
        }
        elseif($tmp['sale_fake']!='') {
            $tmp['sale_phone']=$tmp['sale_fake'];
        }

        $zserv[$service_feed]=array(
            'service_name'=>$service_name,
            'fu_url'=>$tmp['fu_url'],
            'sale_phone'=>$tmp['sale_phone'],
            'fu_view'=>$tmp['fu_view'],
            'fu_open'=>$tmp['fu_open'],
        );
    }

    // core::pre($zserv);

    if (count($zserv)) {
        foreach ($services as $service_id=>$service_name) {
            if (isset($zserv[$service_id])) {
                $tmp=$zserv[$service_id];
                $tpl->parse_block('service_row2', array(
                    'SERVICE_NAME'=>htmlspecialchars($service_name),
                    'FU_URL'=>nl2br(htmlspecialchars(wordwrap($tmp['fu_url'], 100, "\n", true))),
                    'FU_LINK'=>htmlspecialchars($tmp['fu_url']),
                ), true);
                $xcnt++;
            }
            else {
                continue;
                $tpl->parse_block('service_row1', array(
                    'SERVICE_NAME'=>htmlspecialchars($service_name),
                ), true);
            }
            $tpl->parse_block('service_row', array(
            ), true);
        }

        if ($xcnt>0) {
            $tpl->parse_block('flat_services', array(
            ), true);
        }
    }
}

$html.=$tpl->parse_template(array(
    'FLAT_HEAD'=>htmlspecialchars($data['flat_head']),
    'COMPLEX_NAME'=>htmlspecialchars($data['complex_name']),
    'FLAT_PRICE'=>split_num($data['flat_price_total']),
    'FLAT_PRICE_METR'=>split_num(intval($data['flat_price_total']/$data['flat_room_total'])),
    'FLAT_AREA'=>htmlspecialchars($data['flat_room_total']),
    'FLAT_KITCHEN'=>htmlspecialchars($data['flat_room_kitchen']),
    'FLAT_LIVE'=>htmlspecialchars($data['flat_room_live']),
    'FLAT_ROOMS'=>htmlspecialchars($data['flat_room']),
    'FLAT_LEVEL'=>htmlspecialchars($data['flat_level']),
    'SECTION_LEVEL'=>htmlspecialchars($data['section_levels']),
    'SECTION_NUM'=>htmlspecialchars($data['section_num']),
    'FLAT_UPDATE'=>date('d.m.Y в H:i',$data['flat_date_update']),
    'FLAT_DESC'=>nl2br(generate_desc_new($data['flat_id']), true),
    'FLAT_DECOR'=>htmlspecialchars($data['flat_decor_name']),
    'FLAT_WINDOW'=>htmlspecialchars($data['flat_window_name']),
    'FLAT_FLOOR'=>htmlspecialchars($data['flat_floor_name']),
    'FLAT_TYPE'=>htmlspecialchars($data['flat_room_name']),
    'FLAT_REPAIR'=>htmlspecialchars($data['flat_renovation_name']),
    'FLAT_QUALITY'=>htmlspecialchars($data['flat_quality_name']),
    'STUDIO_1'=>($data['flat_studio']=='y'?'positive':'negative'),
    'STUDIO_2'=>($data['flat_studio']=='y'?'Да':'Нет'),
    'FREEPLAN_1'=>($data['flat_freeplan']=='y'?'positive':'negative'),
    'FREEPLAN_2'=>($data['flat_freeplan']=='y'?'Да':'Нет'),
    'PARKING_1'=>($data['complex_parking']=='y'?'positive':'negative'),
    'PARKING_2'=>($data['complex_parking']=='y'?'Да':'Нет'),
    'FOREST_1'=>($data['complex_forest']=='y'?'positive':'negative'),
    'FOREST_2'=>($data['complex_forest']=='y'?'Да':'Нет'),
    'MARKET_1'=>($data['complex_market']=='y'?'positive':'negative'),
    'MARKET_2'=>($data['complex_market']=='y'?'Да':'Нет'),
    'HAGGLE_1'=>($data['flat_haggle']=='y'?'positive':'negative'),
    'HAGGLE_2'=>($data['flat_haggle']=='y'?'Да':'Нет'),
    'DEFERRED_1'=>($data['flat_deferred']=='y'?'positive':'negative'),
    'DEFERRED_2'=>($data['flat_deferred']=='y'?'Да':'Нет'),
    'MORTGAGE_1'=>($data['flat_mortgage']=='y'?'positive':'negative'),
    'MORTGAGE_2'=>($data['flat_mortgage']=='y'?'Да':'Нет'),
    'SHOP_1'=>($data['complex_shop']=='y'?'positive':'negative'),
    'SHOP_2'=>($data['complex_shop']=='y'?'Да':'Нет'),
    'CHILD_1'=>($data['complex_playground']=='y'?'positive':'negative'),
    'CHILD_2'=>($data['complex_playground']=='y'?'Да':'Нет'),
    'SECURITY_1'=>($data['complex_security']=='y'?'positive':'negative'),
    'SECURITY_2'=>($data['complex_security']=='y'?'Да':'Нет'),
    'TRASH_1'=>($data['section_trash']=='y'?'positive':'negative'),
    'TRASH_2'=>($data['section_trash']=='y'?'Да':'Нет'),
    'PHONE_1'=>($data['flat_tel']=='y'?'positive':'negative'),
    'PHONE_2'=>($data['flat_tel']=='y'?'Да':'Нет'),
    'LIFTP_1'=>($data['section_liftp']>0?'positive':'negative'),
    'LIFTP_2'=>($data['section_liftp']>0?$data['section_liftp']:'Нет'),
    'LIFTG_1'=>($data['section_liftg']>0?'positive':'negative'),
    'LIFTG_2'=>($data['section_liftg']>0?$data['section_liftg']:'Нет'),
    'LODGIA_1'=>($data['flat_lodgia']>0?'positive':'negative'),
    'LODGIA_2'=>($data['flat_lodgia']>0?$data['flat_lodgia']:'Нет'),
    'BALCON_1'=>($data['flat_balcon']>0?'positive':'negative'),
    'BALCON_2'=>($data['flat_balcon']>0?$data['flat_balcon']:'Нет'),
    'SUS_1'=>($data['flat_sus']>0?'positive':'negative'),
    'SUS_2'=>($data['flat_sus']>0?$data['flat_sus']:'Нет'),
    'SUR_1'=>($data['flat_sur']>0?'positive':'negative'),
    'SUR_2'=>($data['flat_sur']>0?$data['flat_sur']:'Нет'),
    'ADD'=>$add,
), true);
