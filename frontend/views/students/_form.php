<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model frontend\models\Students */
/* @var $form yii\widgets\ActiveForm */
/* @var array $groups */

?>

<div class="students-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'last_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'first_name')->textInput(['maxlength' => true]) ?>
    <?php
        if (isset($groups))
        {
            echo $form->field($model, 'group_id')->dropDownList($groups, ['prompt' => 'Выберите группу']);
        }
    ?>

    <div class="form-group">
        <?=
        Html::submitButton(
                $model->isNewRecord ? 'Создать' : 'Изменить',
            ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary'])
        ?>
        
    </div>

    <?php ActiveForm::end(); ?>

</div>
