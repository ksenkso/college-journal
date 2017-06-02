<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model frontend\models\Today */

$this->title = 'Create Today';
$this->params['breadcrumbs'][] = ['label' => 'Todays', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="today-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
