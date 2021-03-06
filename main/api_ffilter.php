<?
/**
 * Список квартир
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

$complex_id=isset($_GET['complex_id'])?trim($_GET['complex_id']):(isset($_POST['complex_id'])?trim($_POST['complex_id']):'');

// Список жилых комплексов клиента
$q="SELECT
        GROUP_CONCAT(DISTINCT(CONCAT_WS('|', `complex_id`,`complex_name`)) ORDER BY `complex_name` SEPARATOR '||') AS `f_complex`,
        GROUP_CONCAT(DISTINCT(`building_ident`) ORDER BY `building_ident` SEPARATOR '||') AS `f_building`,
        GROUP_CONCAT(DISTINCT(`section_num`) ORDER BY `section_num` SEPARATOR '||') AS `f_section`,
        MAX(`section_levels`) AS `f_max_section`
    FROM `@_complex_detail`
        , `@_complex`, `@_buildings`, `@_sections`
    WHERE `complex_client` IN (".join(',',$clients).")
";
foreach($user_total_ignore as $data) {
    $tmp=explode('_',$data);
    $q.=" AND NOT (`complex_complex`='".$tmp[0]."' AND `complex_client`='".$tmp[1]."')";
}
if ($complex_id!='') {
    $q.=" AND `complex_id`='".$db->escape($complex_id)."'";
}
$q.=" AND `complex_complex`=`complex_id`
    AND `building_complex`=`complex_id`
    AND `section_building`=`building_id`
";
$db->query($q);

$data=$db->fetch_array();

$result['result']='success';

$result['complex']=array();
$tmp=explode('||',$data['f_complex']);
if (count($tmp)) {
    foreach($tmp as $value) {
        $tmp2=explode('|',$value);
        $result['complex'][]=array(
            'id'=>$tmp2[0],
            'name'=>$tmp2[1],
        );
    }
}
$tmp=explode('||',$data['f_building']);
sort($tmp,SORT_NUMERIC);
$result['building']=$tmp;
$tmp=explode('||',$data['f_section']);
sort($tmp,SORT_NUMERIC);
$result['sections']=$tmp;
$result['max_levels']=$data['f_max_section'];
