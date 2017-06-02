<?php
return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            /*'dsn' => 'mysql:host=mysql.hostinger.ru;dbname=u579847530_journ',
            'username' => 'u579847530_ksenk',
            'password' => '812KKKlm102',*/
            'dsn' => 'mysql:host=130.211.72.254;dbname=hours',
            'username' => 'root',
            'password' => '812KKKlm102',
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@common/mail',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
    ],
];
