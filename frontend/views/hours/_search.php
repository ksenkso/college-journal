<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model frontend\models\HoursSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="hours-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'hours_id') ?>

    <?= $form->field($model, 'date') ?>

    <?= $form->field($model, 'student_id') ?>

    <?= $form->field($model, 'hours') ?>

    <?= $form->field($model, 'group_id') ?>

    <?php // echo $form->field($model, 'hours_good') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
