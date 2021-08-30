<?
/**
 * Главная страница
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

$result=array();

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

$type=isset($_GET['type'])?trim($_GET['type']):(isset($_POST['type'])?trim($_POST['type']):'');

// Список жилых комплексов клиента
$q="SELECT `@_complex_detail`.*, `@_complex`.*,
    `@_regions`.`region_name`, `@_regions`.`region_desc`, `@_sales`.`sale_name`,
    `@_sales`.`sale_id`, `@_foto`.*, COUNT(DISTINCT(`fotocount`.`foto_id`)) AS `foto_count`,
    `client_group`, `client_status`, `client_name`
    , GROUP_CONCAT(DISTINCT(`service_feed`)) AS `complex_feed_ignore`
    FROM `@_complex_detail`
        LEFT JOIN (`@_complex_service`, `@_services`)
            ON (
                `cs_service`=`service_id`
                AND `cs_complex`=`complex_detail_id`
            )
        LEFT JOIN `@_foto` AS `fotocount`
            ON (
                `fotocount`.`foto_parent`=`@_complex_detail`.`complex_detail_id`
                AND `fotocount`.`foto_type`='complex'
            )
        LEFT JOIN `@_foto`
            ON (
                `@_foto`.`foto_parent`=`@_complex_detail`.`complex_detail_id`
                AND `@_foto`.`foto_type`='complex'
                AND `@_foto`.`foto_num`=1
            )
    , `@_complex`, `@_regions`, `@_sales`, `@_clients`
    WHERE `complex_client` IN (".join(',',$clients).")
";
foreach($user_total_ignore as $data) {
    $tmp=explode('_',$data);
    $q.=" AND NOT (`complex_complex`='".$tmp[0]."' AND `complex_client`='".$tmp[1]."')";
}
$q.=" AND `complex_complex`=`complex_id`
    AND `complex_region`=`region_id`
    AND `complex_sale`=`sale_id`
    AND `complex_client`=`client_id`
    GROUP BY `complex_id`
    ORDER BY `client_group`, `complex_name`";
$db->query($q);
$i=0;

$result['result']='success';
$result['client']=array();
$result['complex']=array();

while($data=$db->fetch_array()) {
    // core::pre($data);

    // $q="SELECT COUNT(*) AS `buildings_num` FROM `@_buildings`, `@_buildings_detail`
    //     WHERE `building_complex`='".$data['complex_id']."'
    //     AND `@_buildings_detail`.`building_building`=`building_id`
    //     AND `building_client` IN (".join(',',$clients).")
    // ";
    // $db->query($q,1);
    // $tmp1=$db->fetch_array(1);

    $q="SELECT COUNT(DISTINCT(`flat_id`)) AS `flats_num`,
        MAX(`flat_date_update`) AS `date_update`
        FROM `@_buildings`, `@_buildings_detail`, `@_flats`
        WHERE
        `flat_building`=`building_detail_id`
        AND `@_buildings_detail`.`building_building`=`building_id`
        AND `building_complex`='".$data['complex_id']."'
        AND `building_client` IN (".join(',',$clients).")
        AND `flat_status`=0
        AND `flat_commerce`=0
    ";
    $db->query($q,1);
    $flats=$db->fetch_array(1);
    // core::pre($flats);

    if ($type=='active' && $flats['flats_num']==0) {
        continue;
    }
    if ($type=='nonactive' && $flats['flats_num']>0) {
        continue;
    }

    // $q="SELECT COUNT(DISTINCT(`flat_id`)) AS `flats_num`
    //     FROM `@_buildings`, `@_buildings_detail`, `@_flats`
    //     WHERE
    //     `flat_building`=`building_detail_id`
    //     AND `@_buildings_detail`.`building_building`=`building_id`
    //     AND `building_complex`='".$data['complex_id']."'
    //     AND `building_client` IN (".join(',',$clients).")
    //     AND `flat_status`=1
    //     AND `flat_commerce`=0
    // ";
    // $db->query($q,1);
    // $tmp4=$db->fetch_array(1);

    // Фотография ЖК
    if ($data['foto_thumb']!='') {
        if (file_exists(ROOT_DIR.'../upload'.DIRECTORY_SEPARATOR.$data['foto_thumb']) && file_exists(ROOT_DIR.'../upload'.DIRECTORY_SEPARATOR.$data['foto_image'])) {
            $link='http://na100.pro/upload/'.$data['foto_image'];
        }
        else {
            $link='http://na100.pro/upload/no_image.jpg';
        }
    }

    if ($flats['flats_num']>0) {
        $result['complex'][]=array(
            'complex_id'=>intval($data['complex_id']),
            'complex_name'=>$data['complex_name'],
            'complex_image'=>$link,
            'complex_status'=>'active',
            'flats_count'=>intval($flats['flats_num']),
            'updated'=>($flats['flats_num']>0?date('d.m.Y в H:i',$flats['date_update']):'нет данных'),
        );
        // $tpl->parse_block('complex_active', array(
        //     'COMPLEX_NAME'=>htmlspecialchars($data['complex_name']),
        //     'FLATS_NUM'=>intval($flats['flats_num']),
        //     'COMPLEX_ID'=>intval($data['complex_id']),
        //     'UPDATED'=>($flats['flats_num']>0?date('d.m.Y в H:i',$flats['date_update']):'нет данных'),
        //     'LINK'=>$link,
        // ), true);
    }
    else {
        $result['complex'][]=array(
            'complex_id'=>intval($data['complex_id']),
            'complex_name'=>$data['complex_name'],
            'complex_image'=>$link,
            'complex_status'=>'nonactive',
            'flats_count'=>0,
            'updated'=>($flats['flats_num']>0?date('d.m.Y в H:i',$flats['date_update']):'нет данных'),
        );

        // $tpl->parse_block('complex_disabled', array(
        //     'COMPLEX_NAME'=>htmlspecialchars($data['complex_name']),
        //     'FLATS_NUM'=>0,
        //     'UPDATED'=>($flats['flats_num']>0?date('d.m.Y в H:i',$flats['date_update']):'нет данных'),
        //     'LINK'=>$link,
        // ), true);
    }
    // $tpl->parse_block('complex', array(
    // ), true);
}

$active_all='';
$active_active='';
$active_nonactive='';

if ($type=='active') {
    $active_active='active';
}
elseif ($type=='nonactive') {
    $active_nonactive='active';
}
else {
    $active_all='active';
}

// Общие данные по клиенту
$q="SELECT * FROM `@_foto`
    WHERE
    `foto_parent`='".$db->escape($user['client_id'])."'
    AND `foto_type`='client'
    LIMIT 1
";
$db->query($q);
$image=$db->fetch_array();
if ($image['foto_image'] && file_exists(ROOT_DIR.'../upload/'.$image['foto_image'])) {
    $link='http://na100.pro/upload/'.$image['foto_image'];
}
else {
    $link='http://na100.pro/upload/no_image.jpg';
}

// core::pre($image);
// exit;

$result['client']=array(
    'client_name'=>$CLIENTX_NAME,
    'client_image'=>$link,
);

// $html.=$tpl->parse_template(array(
//     'CLIENT_NAME'=>htmlspecialchars($CLIENTX_NAME),
//     'CLIENT_IMAGE'=>$link,
//     'ACTIVE_ALL'=>$active_all,
//     'ACTIVE_ACTIVE'=>$active_active,
//     'ACTIVE_NONACTIVE'=>$active_nonactive,
// ), true);
