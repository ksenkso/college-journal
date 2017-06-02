<?php

/** @var $this \yii\web\View */
/** @var $content string */
/** @var string $controlPanel */

use yii\bootstrap\ButtonDropdown;
use yii\helpers\Html;
use frontend\assets\AppCssAsset;
use yii\bootstrap\Alert;
use yii\helpers\Url;

AppCssAsset::register($this);

$user = \Yii::$app->getUser();
$controlPanel = false;


if ($user->can('su'))
{
    $controlPanel = 'Hello, admin!';
}
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode('Журнал посещаемости') ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>
<div id="overlay" class="overlay">
    <?= Alert::widget([
        'options' => [
            'class' => 'alert-info',
        ],
        'body' => 'Загрузка...'
    ]) ?>
</div>
<div class="container-fluid">
    <header class="row bg-primary">
        <h1 class="col col-xs-8">
            <a href="<?= Url::to(['site/index']) ?>">
                Журнал
            </a>
        </h1>
        <h1 class="col col-xs-1 col-md-offset-3">
            <?php
            $user = Yii::$app->getUser();
            if (!$user->isGuest) {

                $dropdown = [
                    'items' => []
                ];

                if ($user->can('teacher') || $user->can('admin'))
                {
                    $dropdown['items'][] = [
                        'label' => 'Ведомость',
                        'url' => Url::to(['students/hours'])
                    ];

	                $dropdown['items'][] = [
		                'label' => 'Кабинет',
		                'url' => 'http://' . (getenv('CABINET_DOMAIN') ? getenv('CABINET_DOMAIN') : preg_replace('~journal\.~','',getenv('VIRTUAL_HOST'), 1))
	                ];
                }





                $dropdown['items'][] = ['label' => 'Выход', 'url' => Url::to(['site/logout'])];

                echo ButtonDropdown::widget([
                    'label' => 'Меню',
                    'options' => [
                        'class' => 'btn-primary'
                    ],
                    'dropdown' => $dropdown,

                ]);

            }

            ?>
        </h1>
    </header>
</div>
<div class="wrap">
    <?=
    yii\widgets\Breadcrumbs::widget([
        'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
    ])
    ?>
    <div class="container">
        
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; My Company <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>



<?php $this->endBody() ?>
<script>
    let $notificationsCounter = $('<span />', {class: 'notification-counter'});
    $.get('/site/notifications')
        .success(r => {
        let notifications = JSON.parse(r);
    if (notifications.length) {
        $notificationsCounter.text(notifications.length);
        $notificationsCounter.insertAfter('#w1');
    }
    });

</script>

</body>
</html>
<?php $this->endPage() ?>
