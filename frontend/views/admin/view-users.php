<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel common\models\UserSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Пользователи';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Добавить пользователя', ['admin/create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'username:text:Ник',
            'first_name:text:Имя',
            'last_name:text:Фамилия',
            [
                'label' => 'Группа',
                'value' => 'group.abbrevation'
            ],
            [
                'label' => 'Год поступления',
                'value' => 'group.year'
            ],
            [
                'label' => 'Номер группы',
                'value' => 'group.group_number'
            ],
            // 'auth_key',
            // 'password_hash',
            // 'password_reset_token',
            // 'email:email',
            [
                'label' => 'Статус',
                'value' => function ($data) {
                    switch ($data->status) {
                        case 10:
                            return 'Активен';
                            break;
                        case 20:
                            return 'Неактивен';
                            break;
                        case 0:
                            return 'Удалён';
                            break;
                        default:
                            return 'Активен';
                    }
                }
            ],
            // 'created_at',
            // 'updated_at',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
