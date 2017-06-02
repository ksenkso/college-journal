<?php

/* @var $this yii\web\View */
/* @var $students common\models\User */
use app\components\StudentFormWidget;
use backend\assets\AppAsset;
use frontend\assets\AppJsAsset;
use yii\bootstrap\Alert;

$this->title = 'My Yii Application';
AppJsAsset::register($this);
$user = Yii::$app->user;

?>
<div class="row">
    <div class="col col-xs-12">
        <div class="panel panel-default">
            <div class="container-fluid">
                <header class="row">
                    <div class="col col-xs-12">
                        <h2>Дата: <?= date('d.m.y') ?></h2>
                    </div>
                </header>
                <div class="row">
                    <div class="col col-xs-12">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col col-xs-12 btn btn-primary js-lesson">
                                    <h2>Пара 1</h2>
                                </div>
                                <div class="col col-xs-12 btn btn-primary js-lesson">
                                    <h2>Пара 2</h2>
                                </div>
                                <div class="col col-xs-12 btn btn-primary js-lesson">
                                    <h2>Пара 3</h2>
                                </div>
                                <div class="col col-xs-12 btn btn-primary js-lesson">
                                    <h2>Пара 4</h2>
                                </div>
                            </div>
                            <br><br>
                            <div class="row">
                                <button type="button" class="col col-xs-12 btn btn-primary js-submit">
                                    <h2>Отправить</h2>
                                </button>
                            </div>
                            <?php if ($user->can('teacher') || $user->can('admin')): ?>
                                <div class="row">
                                    <button type="button" class="col col-xs-12 btn btn-primary js-commit">
                                        <h2>Сохранить день</h2>
                                    </button>
                                </div>
                                <div class="row">
                                    <button type="button" class="col col-xs-12 btn btn-primary js-clear">
                                        <h2>Очистить день</h2>
                                    </button>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?= StudentFormWidget::widget(['students' => $students, 'title' => 'Выберите студентов:']) ?>

