<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 01.10.2016
 * Time: 10:58
 */
use common\models\AuthItem;
use common\models\User;
use frontend\models\Permissions;
use yii\helpers\Html;
use yii\rbac\Role;
use yii\widgets\ActiveForm;

/* @var Role[] $roles */
/* @var User $user */
/* @var AuthItem[] $userRoles */
/* @var Permissions $permissions */
$currentRoles = [];

foreach ($roles as $role) {
    $userHasRole = false;

    foreach ($userRoles as $userRole) {
        if ($userRole->name == $role->name)
        {
            $userHasRole = true;
        }
    }

    $currentRoles[] = ['name' => $role->name, 'checked' => $userHasRole];

}


?>

<div class="panel">
    <div class="overfolw-x">
        <h1><?= $user->last_name . ' ' . $user->first_name ?></h1>
        <h4><?= $user->group->abbrevation . ' ' . $user->group->year . '.' . $user->group->group_number?></h4>
        <h4>Права:</h4>
        <?php $form = ActiveForm::begin(); ?>
        
        <?= $form->field($permissions, 'isAdmin')->checkbox() ?>

        <?= $form->field($permissions, 'isSteward')->checkbox() ?>

        <?= $form->field($permissions, 'isStudent')->checkbox(['checked' => 'checked']) ?>

        <?= $form->field($permissions, 'userId', ['options' => ['class' => 'hide']])->hiddenInput(['value' => $user->id]) ?>
        <div>
            <?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>
        </div>
        
        <?php ActiveForm::end(); ?>
    </div>
</div>


