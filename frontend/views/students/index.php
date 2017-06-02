<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel frontend\models\StudentsSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Студенты группы';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="students-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?php

            $columns  = [
                ['class' => 'yii\grid\SerialColumn'],

                'last_name',
                'first_name'
            ];

            if (Yii::$app->user->can('changeStudents'))
            {
                $columns[] = ['class' => 'yii\grid\ActionColumn'];

                echo Html::a('Добавить студента', ['create'], ['class' => 'btn btn-success']);
            }
        ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => $columns
    ]); ?>
</div>
