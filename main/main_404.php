<?
/**
 * Страница не найдена
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

// // Хлебные крошки
// $overall->parse_block('navigation_active',array(
//     'NAVIGATION_URL'=>'/index.php',
//     'NAVIGATION_NAME'=>'Главная страница'
// ), true);

// $overall->parse_block('navigation_static',array(
//     'NAVIGATION_NAME'=>'Страница не найдена'
// ), true);

// Подключить парсер шаблонов
$tpl = new parser (ROOT_DIR.'templates');
$tpl->set_template('main_404.html');

$content->add_meta('title','Страница не найдена');

$html.=$tpl->parse_template(array(
), true);
