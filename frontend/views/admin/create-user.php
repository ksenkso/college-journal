<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 25.09.2016
 * Time: 20:55
 */

/** @var \common\models\User $model */
/** @var array $groups */
/** @var array $rolesList */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = 'Создание пользователя';
$this->params['breadcrumbs'][] = ['label' => 'Панель администратора', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-signup">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Заполните данные нового пользователя:</p>

    <div class="row">
        <div class="col-lg-5">
            <?php $form = ActiveForm::begin(['id' => 'form-signup']); ?>

            <?=
            $form->field($model, 'username')->textInput(['autofocus' => true]) ?>

            <?= $form->field($model, 'firstName') ?>

            <?= $form->field($model, 'lastName') ?>


            <?= $form->field($model, 'email', ['inputOptions' => ['type' => 'email']]) ?>

            <?= $form->field($model, 'password')->passwordInput() ?>

            <?= $form->field($model, 'role')->dropDownList($rolesList, ['prompt' => 'Выберите роль']) ?>

            <?= $form->field($model, 'groupId')->dropDownList($groups, ['prompt' => 'Выберите группу']) ?>

            <div class="form-group">
                <?= Html::submitButton('Добавить', ['class' => 'btn btn-primary', 'name' => 'signup-button']) ?>
            </div>

            <?php ActiveForm::end(); ?>

        </div>
    </div>
</div>
