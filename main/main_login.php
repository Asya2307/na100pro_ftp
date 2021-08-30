<?
/**
 * Вход в систему и выход
 *
 * @author ManHunter / PCL
 * @version 1.0
 */

// Защита от прямого вызова скрипта
if (!defined('PCL_OK')) { exit; }

switch ($action) {
    // Авторизация
    case "enter": {
        // core::pre('['.'kill'.md5($_POST['password'].'destroy').']');
        // exit;


        $login=isset($_POST['login'])?$_POST['login']:'';
        $password=isset($_POST['password'])?md5('kill'.md5($_POST['password'].'destroy')):'';
        if (isset($_POST['remember']) && $_POST['remember']==1) {
            $time=0x7FFFFFFF;
        }
        else {
            $time=0;
        }
        SetCookie('login',$login, $time, '/', '.'.getenv('HTTP_HOST'));
        SetCookie('password',$password, $time, '/', '.'.getenv('HTTP_HOST'));

        write_log('Попытка авторизации в системе', $login);

        break;
    }
    // Выход из системы
    case "exit": {
        SetCookie('login','', 0x7FFFFFFF, '/', '.'.getenv('HTTP_HOST'));
        SetCookie('password','', 0x7FFFFFFF, '/', '.'.getenv('HTTP_HOST'));

        SetCookie('login','', 0x7FFFFFFF, '/');
        SetCookie('password','', 0x7FFFFFFF, '/');

        write_log('Выход из системы');

        break;
    }
}

header('Location: /');
exit;
