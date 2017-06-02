<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model frontend\models\Students */
/* @var frontend\models\Group $groups */

$this->title = 'Добавить студента';
$this->params['breadcrumbs'][] = ['label' => 'Students', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="students-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= 
    $this->render('_form', [
        'model' => $model,
        'groups' => $groups
    ]) ?>

</div>
