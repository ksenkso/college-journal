<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model frontend\models\NotificationSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="notification-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'notification_id') ?>

    <?= $form->field($model, 'type') ?>

    <?= $form->field($model, 'target') ?>

    <?= $form->field($model, 'from') ?>

    <?= $form->field($model, 'to') ?>

    <?php // echo $form->field($model, 'is_read') ?>

    <?php // echo $form->field($model, 'ts') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
