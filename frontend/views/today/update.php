<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model frontend\models\Today */

$this->title = 'Update Today: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Todays', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="today-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
