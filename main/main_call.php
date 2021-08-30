<?
/**
 * Отчет по звонкам
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

// Подключить парсер шаблонов
$tpl = new parser (ROOT_DIR.'templates');
$tpl->set_template('main_call.html');

$content->add_meta('title','Отчет по звонкам');

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
$fdate=(isset($_GET['fdate'])?trim($_GET['fdate']):'');
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

// Дата начала и окончания
$tmp=explode('-',$fdate);
if (count($tmp)==2) {
    $tmp[0]=trim($tmp[0]);
    $tmp[1]=trim($tmp[1]);

    if (preg_match('/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/', $tmp[0], $matches)) {
        $ffrom_time=mktime(0, 0, 1, intval($matches[2]), intval($matches[1]), intval($matches[3]));
    }
    else {
        $ffrom_time=0;
    }
    $fto=isset($_GET['fto'])?trim($_GET['fto']):0;
    if (preg_match('/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/', $tmp[1], $matches)) {
        $fto_time=mktime(23, 59, 59, intval($matches[2]), intval($matches[1]), intval($matches[3]));
    }
    else {
        $fto_time=0;
    }

    if ($ffrom_time==0 || $fto_time==0 || $ffrom_time>$fto_time) {
        $ffrom_time=time()-14*24*60*60;
        $fto_time=time();
    }
}
else {
    $ffrom_time=time()-14*24*60*60;
    $fto_time=time();
}

$add.='\x26fdate='.date('d.m.Y',$ffrom_time).'+-+'.date('d.m.Y',$fto_time);

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

$labels=array();
for($i=$ffrom_time; $i<=$fto_time; $i+=(24*60*60)) {
    $labels[]="'".date('d.m',$i)."'";
}

// Данные для графика
$q="SELECT
    FROM_UNIXTIME(`call_date`,'%d.%m') AS `call_xdate`,
    `call_date`,
    SUM(IF(`call_usefull`=0,1,0)) AS `count_0`,
    SUM(IF(`call_usefull`=1,1,0)) AS `count_1`,
    SUM(IF(`call_usefull`=2,1,0)) AS `count_2`,
    SUM(IF(`call_usefull`=3,1,0)) AS `count_3`,
    SUM(IF(`call_usefull`=4,1,0)) AS `count_4`,
    SUM(IF(`call_saved`=1 AND `call_usefull`!=4,1,0)) AS `count_5`,
    SUM(IF(`call_saved`=1 AND `call_usefull`!=4,`call_price_client`,0)) AS `saved`,
    COUNT(`call_id`) AS `count_all`
    FROM `@_call`
        LEFT JOIN (`@_complex`, `@_complex_detail`) ON (
            `call_complex`=`complex_id`
            AND `complex_complex`=`complex_id`
            AND `complex_client`=`call_client`
        )
    WHERE
";

$q2="`call_date`>='".$ffrom_time."' AND `call_date`<='".$fto_time."'
    AND `call_client` IN (".join(',',$clients).")
";

// Список номеров, которые не надо показывать пользователю
$ignored=array();
$qz="SELECT * FROM `@_user_phone`, `@_phones`
    WHERE
    `up_phone`=`phone_id`
    AND `up_user`='".$db->escape($user['user_id'])."'
    AND `phone_client` IN (".join(',',$clients).")
    AND `phone_own`=0
";
$db->query($qz);
while($tmp=$db->fetch_array()) {
    $ignored[]=substr($tmp['phone_number'],1);
}
$ignored[]='xxx-yyy-zzz';

$q2.=" AND `call_virtual` NOT IN ('".join("','",$ignored)."')";

// Список скрываемых ЖК
if (isset($user['user_total_ignore'])) {
    $user_total_ignore=explode(',',$user['user_total_ignore']);
}
else {
    $user_total_ignore=array();
}
$user_total_ignore[]='0_0';

foreach($user_total_ignore as $data) {
    $tmp=explode('_',$data);
    $q2.=" AND NOT (`call_complex`='".$tmp[0]."' AND `call_client`='".$tmp[1]."')";
}

if ($user['user_date_begin']>0) {
    $q2.=" AND `call_date`>'".$db->escape($user['user_date_begin'])."'";
}
if ($user['user_date_end']>0) {
    $q2.=" AND `call_date`<'".$db->escape($user['user_date_end'])."'";
}
if ($fcomplex>0) {
    $q2.=" AND `call_complex`='".$db->escape($fcomplex)."'";
}
$q2.=" AND `call_date`>'".$db->escape($ffrom_time)."'";
$q2.=" AND `call_date`<'".$db->escape($fto_time)."'";

$q3=" GROUP BY `call_xdate`";

// core::pre($q.$q2.$q3);

$db->query($q.$q2.$q3);

$count_all=array();
$count_0=array();
$count_1=array();
$count_2=array();
$count_3=array();
$count_4=array();
$count_5=array();

$total_all=0;
$total_0=0;
$total_1=0;
$total_2=0;
$total_3=0;
$total_4=0;
$total_5=0;
$saved=0;

while($data=$db->fetch_array()) {
    // core::pre($data);
    $total_all+=intval($data['count_all']);
    $total_0+=intval($data['count_0']);
    $total_1+=intval($data['count_1']);
    $total_2+=intval($data['count_2']);
    $total_3+=intval($data['count_3']);
    $total_4+=intval($data['count_4']);
    $total_5+=intval($data['count_5']);
    $saved+=intval($data['saved']);

    if ($data['call_date']>=($ffrom_time)) {
        $count_all[]=intval($data['count_all']);
        $count_0[]=intval($data['count_0']);
        $count_1[]=intval($data['count_1']);
        $count_2[]=intval($data['count_2']);
        $count_3[]=intval($data['count_3']);
        $count_4[]=intval($data['count_4']);
        $count_5[]=intval($data['count_5']);
    }
}

$tpl->parse_block('dataset', array(
    'LABELS'=>join(',',$labels),
    'COUNT_ALL'=>join(',',$count_all),
    'COUNT_0'=>join(',',$count_0),
    'COUNT_1'=>join(',',$count_1),
    'COUNT_2'=>join(',',$count_2),
    'COUNT_3'=>join(',',$count_3),
    'COUNT_4'=>join(',',$count_4),
    'COUNT_5'=>join(',',$count_5),
), true);

$p=isset($_GET['p'])?intval($_GET['p']):0;
$start=$p*$limit;

// Список звонков
$q="SELECT SQL_CALC_FOUND_ROWS *
    FROM `@_call`
        LEFT JOIN (`@_complex`, `@_complex_detail`) ON (
            `call_complex`=`complex_id`
            AND `complex_complex`=`complex_id`
            AND `complex_client`=`call_client`
        )
        LEFT JOIN `@_services` ON `service_id`=`call_service`
    WHERE
";

$db->query($q.$q2);

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
    'normal'=>'<li class="pagination__item"><a href="/index.php?page=call&amp;'.str_replace('\x26','&amp;',$add).'&amp;limit='.$limit.'&amp;p={PAGE}" class="pagination__button active"><span>{NUMPAGE}</span></a></li>',
    'current'=>'<li class="pagination__item"><div class="pagination__button"><span>{NUMPAGE}</span></div></li>',
));

if ($found_num>$limit) {
    $tpl->parse_block('list_pages', array(
        'PAGES'=>$paginator->show()
    ), true);
}

$q3=" ORDER BY `call_date` DESC";
$q3.=" LIMIT ".$start.", ".$limit;
$db->query($q.$q2.$q3);

while($data=$db->fetch_array()) {
    // core::pre($data);

    $min=intval($data['call_duration']/60);
    $sec=$data['call_duration']%60;
    $duration=sprintf('%02u:%02u',$min,$sec);

    switch($data['call_usefull']) {
        case '0': {
            $status='<div class="period__status black">В обработке</div>';
            break;
        }
        case '1': {
            $status='<div class="period__status green">Целевой</div>';
            break;
        }
        case '2': {
            $status='<div class="period__status purple">Прозвон</div>';
            break;
        }
        case '3': {
            $status='<div class="period__status yellow">Не принятый</div>';
            break;
        }
        case '4': {
            $status='<div class="period__status gray">На рассмотрении</div>';
            break;
        }
        default: {
            $status='';
            break;
        }
    }

    $tpl->parse_block('call_row', array(
        'CALL_ID'=>$data['call_id'],
        'CALL_DATE'=>date('d.m.Y в H:i',$data['call_date']),
        'CALL_NUMBER'=>htmlspecialchars($data['call_number']),
        'CALL_SERVICE'=>htmlspecialchars($data['service_name']),
        'CALL_COMPLEX'=>htmlspecialchars($data['complex_name']),
        'CALL_DURATION'=>htmlspecialchars($duration),
        'CALL_STATUS'=>$status,
        'MP3_SRC'=>'https://na100.pro/mp3/'.$data['call_link'],
    ), true);
}
// core::pre($found_num);
// exit;

$html.=$tpl->parse_template(array(
    'DATE_BEGIN'=>date('d.m.Y',$ffrom_time),
    'DATE_END'=>date('d.m.Y',$fto_time),
    'TOTAL_ALL'=>$total_all,
    'TOTAL_0'=>$total_0,
    'TOTAL_1'=>$total_1,
    'TOTAL_2'=>$total_2,
    'TOTAL_3'=>$total_3,
    'TOTAL_4'=>$total_4,
    'TOTAL_5'=>$total_5,
    'SAVED'=>$saved,
    'FDATE'=>date('d.m.Y',$ffrom_time).' - '.date('d.m.Y',$fto_time),
    'SELECTED_10'=>($limit==10?'selected="selected"':''),
    'SELECTED_20'=>($limit==20?'selected="selected"':''),
    'SELECTED_100'=>($limit==100?'selected="selected"':''),
    'ADD'=>$add,
    'LIMIT'=>$limit,
), true);
