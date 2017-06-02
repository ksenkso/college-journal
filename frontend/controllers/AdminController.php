<?php
/**
 * Created by PhpStorm.
 * User: yazun
 * Date: 25.09.2016
 * Time: 16:43
 */

namespace frontend\controllers;


use common\models\User;
use common\models\UserSearch;
use frontend\models\Group;
use frontend\models\Hours;
use frontend\models\Notification;
use frontend\models\Permissions;
use frontend\models\SignupForm;
use frontend\models\Students;
use frontend\models\StudentsSearch;
use frontend\models\Today;
use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\Controller;

class AdminController extends Controller
{
    public $layout = 'admin-layout';

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['index'],
                'rules' => [
                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['admin']
                    ],
                    [
                        'actions' => ['index'],
                        'allow' => false,
                        'roles' => ['student', 'steward'],
                        'denyCallback' => function ($rule, $action) {
                            throw new \Exception('You are mot allowed to access administration panel');
                        }
                        
                    ]
                ]
            ]
        ];
    }

    public function actionPermissions()
    {
        $users = User::find()->all();
        $searchModel = new UserSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
        
        return $this->render('permissions', [
            'users' => $users,
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionEditpermissions($id)
    {
        $auth = Yii::$app->authManager;
        $permissions = new Permissions();

        $user = User::findOne(['id' => $id]);

        if ($post = Yii::$app->request->post())
        {
            if ($permissions->load($post) && $permissions->update())
            {
             return $this->render('alert', [
                 'alertClass' => 'success',
                 'heading' => 'Права пользователя ' . $user->last_name . ' ' . $user->first_name . ' изменены',
                 'text' => ''
             ]);
            }
            else
            {
                return $this->render('alert', [
                    'alertClass' => 'error',
                    'heading' => 'Права пользователя ' . $user->last_name . ' ' . $user->first_name . ' не изменены',
                    'text' => 'Произошла ошибка.'
                ]);
            }
        }
        else
        {
            $roles = $auth->getRoles();
            $userRoles = $user->getItemNames()->all();
            $currentRoles = [];
            foreach ($roles as $role) {
                $userHasRole = false;

                foreach ($userRoles as $userRole) {
                    if ($userRole->name == $role->name)
                    {
                        $userHasRole = true;
                    }
                }

                $currentRoles[$role->name] = $userHasRole;

            }
            $permissions->isAdmin = $currentRoles['admin'] ? true : false;
            $permissions->isSteward = $currentRoles['steward'] ? true : false;
            $permissions->isStudent = $currentRoles['student'] ? true : false;


            //print_r($userRoles);
            return $this->render('edit-permissions', [
                'roles' => $roles,
                'userRoles' => $userRoles,
                'user' => $user,
                'permissions' => $permissions
            ]);
        }
        

    }
    

    public function actionIndex()
    {
        $group_id = User::find()->select(['group_id'])->where(['id' => Yii::$app->getUser()->getId()])->scalar();
        $students = User::find()->where(['group_id' => $group_id])->orderBy('id')->all();
        
        return $this->render('index', ['students' => $students]);
    }

    public function actionViewUsers()
    {
        $searchModel = new UserSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
        
        return $this->render('view-users', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionCreateUser()
    {
        
        $model = new SignupForm();
        $groups = Group::find()
            ->select(['abbrevation', 'group_id'])
            ->indexBy('group_id')
            ->column();

        $roles = Yii::$app->authManager->getRoles();
        $rolesList = [];
        foreach ($roles as $role) {
            $rolesList[$role->name] = $role->description;
        }

        if ($model->load(Yii::$app->request->post()))
        {
            if ($user = $model->signup()) {

                $student = new Students();
                $student->first_name = $user->first_name;
                $student->last_name = $user->last_name;
                $student->group_id = $user->group_id;



                if ($student->save())
                {
                    $id = Students::find()->select(['student_id'])->where([
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'group_id' => $user->group_id
                    ])->scalar();
                    $today = new Today();
                    $today->student_id = $id;
                    $today->group_id = $user->group_id;
                    $today->hours = '0000';
                    if ($today->save())
                    {
                        return $this->render('alert', [
                            'alertClass' => 'info',
                            'heading' => 'Пользователь создан',
                            'text' => "Имя: $user->last_name $user->first_name"
                        ]);
                    }
                } else {
                    \Yii::trace('NOT VALID::SAVE');
                }


            }

            return $this->render('alert', [
                'alertClass' => 'error',
                'heading' => 'Ошибка!',
                'text' => "Некорректные данные"
            ]);
        }

        return $this->render('create-user', [
            'model' => $model,
            'rolesList' => $rolesList,
            'groups' => $groups
        ]);
    }
}