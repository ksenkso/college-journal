<?php
$user = getenv('MYSQL_USER');
$host = getenv('MYSQL_HOST') or 'localhost';
$dbname = getenv('MYSQL_DBNAME') ? getenv('MYSQL_DBNAME') : 'u1470_journal';
$pass = $host === 'localhost' ? '' : getenv('MYSQL_PASSWORD');

return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => "mysql:host=$host;dbname=$dbname",
            'username' => $user,
            'password' => $pass,
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@common/mail',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ]
    ],
    'modules' => [
        'v1' => [
            'class' => 'frontend\modules\v1'
        ]
    ]
];