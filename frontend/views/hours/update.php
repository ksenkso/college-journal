<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model frontend\models\Hours */

$this->title = 'Update Hours: ' . $model->hours_id;
$this->params['breadcrumbs'][] = ['label' => 'Hours', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->hours_id, 'url' => ['view', 'id' => $model->hours_id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="hours-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
