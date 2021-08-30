<?
/**
 * Список квартир
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

// Подключить парсер шаблонов
$tpl = new parser (ROOT_DIR.'templates');
$tpl->set_template('main_flats.html');

$content->add_meta('title','Квартиры в продаже');

// Список скрываемых ЖК
if (isset($user['user_total_ignore'])) {
    $user_total_ignore=explode(',',$user['user_total_ignore']);
}
else {
    $user_total_ignore=array();
}
$user_total_ignore[]='0_0';

$q="SELECT * FROM `@_services` WHERE `service_stat`!=''";
$db->query($q);
$services=array();
while ($tmp=$db->fetch_array()) {
    $services[$tmp['service_feed']]=$tmp;
}

$clients=array();
$clients[]=$user['user_client'];
$clients=$TOTAL_CLIENTS;

$fcomplex=(isset($_GET['fcomplex'])?intval($_GET['fcomplex']):0);
$limit=(isset($_GET['limit'])?intval($_GET['limit']):10);
if ($limit!=10 && $limit!=20 && $limit!=100) {
    $limit=10;
}

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

// ЖК есть в списке клиентских?
if (!in_array($fcomplex, $complex)) {
    $fcomplex=0;
}

if ($fcomplex!=0) {
    $add.='\x26fcomplex='.$fcomplex;
}

$complex[]=0;
$q="SELECT `complex_name`, `complex_id`
    FROM `@_complex`
    WHERE
    `complex_id` IN (".join(',',$complex).")
    ORDER BY `complex_name`
";
$db->query($q);
while($data=$db->fetch_array()) {
    $tpl->parse_block('filter_complex', array(
        'FCOMPLEX_ID'=>intval($data['complex_id']),
        'FCOMPLEX_NAME'=>htmlspecialchars($data['complex_name']),
        'SELECTED'=>($data['complex_id']==$fcomplex?'selected="selected"':''),
    ), true);
}

$q2='';

if ($fcomplex>0) {
    $q2.=" AND `complex_id`='".$db->escape($fcomplex)."'";
}

$p=isset($_GET['p'])?intval($_GET['p']):0;
$start=$p*$limit;

// Список квартир
$q=" SELECT SQL_CALC_FOUND_ROWS * FROM `@_flats`
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
    AND `building_client` IN (".join(',',$clients).")
    AND `flat_client`=`complex_client`
";

$q3=" GROUP BY `flat_id`";

$db->query($q.$q2.$q3);

$num=0;
$qx="SELECT FOUND_ROWS() AS `num`";
$db->query($qx,1);
$tmp=$db->fetch_array(1);
$found_num=intval($tmp['num']);

if ($start>$found_num) {
    $start=0;
    $p=0;
}

$paginator=new paginator();
$paginator->total_pages=ceil($found_num/$limit);
$paginator->current_page = $p;
$paginator->pages_in_row = 7;
$paginator->set_template(array(
    'normal'=>'<li class="pagination__item"><a href="/index.php?page=flats&amp;'.str_replace('\x26','&amp;',$add).'&amp;limit='.$limit.'&amp;p={PAGE}" class="pagination__button active"><span>{NUMPAGE}</span></a></li>',
    'current'=>'<li class="pagination__item"><div class="pagination__button"><span>{NUMPAGE}</span></div></li>',
));

if ($found_num>$limit) {
    $tpl->parse_block('list_pages', array(
        'PAGES'=>$paginator->show()
    ), true);
}

if ($p>0) {
    $add.='&amp;p='.$p;
}
if ($limit!=10) {
    $add.='&amp;limit='.$limit;
}

// Список квартир клиента с примененным фильтром
$q=" SELECT * FROM `@_flats`
        LEFT JOIN `@_foto` AS `fotocount`
            ON (
                `fotocount`.`foto_parent`=`@_flats`.`flat_id`
                AND `fotocount`.`foto_type`='flat'
            )
        LEFT JOIN `@_foto`
            ON (
                `@_foto`.`foto_parent`=`@_flats`.`flat_id`
                AND `@_foto`.`foto_type`='flat'
                AND `@_foto`.`foto_num`='1'
            )
        LEFT JOIN `@_sections` ON `flat_section`=`section_id`
        LEFT JOIN `@_currency` ON `flat_currency`=`currency_id`
        LEFT JOIN `@_packs` ON `flat_pack`=`pack_id`
        LEFT JOIN `@_flats_services` ON `fs_flat_id`=`flat_id`
        LEFT JOIN `@_services` AS `fs` ON `fs`.`service_id`=`fs_service_id`
        LEFT JOIN `@_flats_feed` ON `ff_flat_id`=`flat_id`
        LEFT JOIN `@_services` AS `ff` ON `ff`.`service_id`=`ff_service_id`
        LEFT JOIN (`@_campaign_object` AS `co1`
            LEFT JOIN `@_campaigns` AS `flc` ON `flc`.`campaign_id`=`co1`.`co_campaign`
        ) ON (`flat_id`=`co1`.`co_parent` AND `co1`.`co_type`='flat')
    , `@_buildings`
    , `@_buildings_detail`
        LEFT JOIN (`@_campaign_object` AS `co2`
            LEFT JOIN `@_campaigns` AS `blc` ON `blc`.`campaign_id`=`co2`.`co_campaign`
        ) ON (`building_detail_id`=`co2`.`co_parent` AND `co2`.`co_type`='building')
    , `@_complex_detail`
        LEFT JOIN (`@_campaign_object` AS `co3`
            LEFT JOIN `@_campaigns` AS `cmc` ON `cmc`.`campaign_id`=`co3`.`co_campaign`
        ) ON (`complex_detail_id`=`co3`.`co_parent` AND `co3`.`co_type`='complex')
    , `@_complex`
    WHERE
    `building_complex`=`complex_complex`
    AND `flat_status`=0
    AND `flat_commerce`=0
    AND `complex_id`=`complex_complex`
    AND `@_buildings_detail`.`building_building`=`building_id`
    AND `flat_building`=`building_detail_id`
    AND `building_client` IN (".join(',',$clients).")
    AND `flat_client`=`complex_client`
";

$q3=" GROUP BY `flat_id` ORDER BY `complex_id`, `building_ident` DESC, `section_num` DESC";
$q3.=" LIMIT ".$start.", ".$limit;
$db->query($q.$q2.$q3);

$num=$start;

while($data=$db->fetch_array()) {
    // core::pre($data);

    if ($data['flat_price_campaign']>0) {
        $tpl->parse_block('flat_price2', array(
            'PRICE2'=>split_num($data['flat_price_campaign']),
        ), true);
    }

    if ($data['foto_thumb']!='') {
        $image=$data['foto_thumb'];
    }
    else {
        $image='no_image_tn.jpg';
    }

    $tpl->parse_block('flat_row', array(
        'NUM'=>(++$num),
        'FLAT_ID'=>$data['flat_id'],
        'IMAGE'=>'http://na100.pro/upload/'.$image,
        'FLAT_ROOMS'=>htmlspecialchars($data['flat_room']),
        'FLAT_PRICE'=>split_num($data['flat_price_total']),
        'FLAT_AREA'=>htmlspecialchars($data['flat_room_total']),
        'FLAT_NUM'=>htmlspecialchars($data['flat_num']),
        'FLAT_HEAD'=>htmlspecialchars($data['flat_head']),
        'FLAT_LEVEL'=>htmlspecialchars($data['flat_level']),
        'FLAT_SECTION'=>htmlspecialchars($data['section_num']),
        'FLAT_BUILDING'=>htmlspecialchars($data['building_ident']),
        'COMPLEX_NAME'=>htmlspecialchars($data['complex_name']),
        'ADD'=>str_replace('\x26','&amp;',$add),
    ), true);
}

$html.=$tpl->parse_template(array(
    'SELECTED_10'=>($limit==10?'selected="selected"':''),
    'SELECTED_20'=>($limit==20?'selected="selected"':''),
    'SELECTED_100'=>($limit==100?'selected="selected"':''),
    'ADD'=>$add,
    'LIMIT'=>$limit,
), true);
