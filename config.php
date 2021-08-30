<?
/**
 * Файл конфигурации
 *
 * @author ManHunter / PCL
 * @version 0.1.0 (revision 14.07.2021)
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

//------------------------------------------------------------------
// Настройки для подключения к базе MySQL
//------------------------------------------------------------------
if (strpos(getenv('SERVER_NAME'),'.local')!==false) {
    define('MYSQL_HOST', 'localhost');
    define('MYSQL_PORT', 3306);
    define('MYSQL_BASE', 'test');
    define('MYSQL_USER', 'root');
    define('MYSQL_PASSWORD', '');
    define('MYSQL_PREFIX', 'realty');

    // Корневая папка скрипта
    define ('HTML_ROOT', 'http://client.local/');
}
else {
    define('MYSQL_HOST', 'localhost');
    define('MYSQL_PORT', 3306);
    define('MYSQL_BASE', 'na100pro_realty');
    define('MYSQL_USER', 'na100pro_dbadmin');
    define('MYSQL_PASSWORD', 'FZKu2zT9WsmV');
    define('MYSQL_PREFIX', 'realty');

    // Корневая папка скрипта
    define ('HTML_ROOT', 'http://client.na100.pro/');
}

// Формат даты и времени
define('DATE_FORMAT', 'd.m.Y - H:i');
define('DATE_FORMAT_SHORT', 'd.m.Y');
define('DATE_FORMAT_FULL', 'd.m.Y - H:i:s');

define('ADMIN_LOGIN', 'admin');
define('ADMIN_PASSWORD', 'ca5a3e5256544a3ca26655bfe1ef8f88');

// Старт сессии
ini_set('session.use_trans_sid', 0);
session_start();

// Установить кодировку системы
setlocale(LC_ALL, 'ru_RU.CP1251');

// Установить временную зону системы
if (function_exists('date_default_timezone_set')) {
    date_default_timezone_set('Europe/Moscow');
}
