<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model frontend\models\Group */
$abbr = $model->getFullAbbreviation();
$this->title = 'Изменить группу: ' . $abbr;
$this->params['breadcrumbs'][] = ['label' => 'Панель администратора', 'url' => ['admin/index']];
$this->params['breadcrumbs'][] = ['label' => 'Группы', 'url' => ['index']];
$this->params['breadcrumbs'][] = $abbr;
?>
<div class="group-update">

    <h1><?= Html::encode($abbr) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
