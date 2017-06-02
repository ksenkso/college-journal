<?php

namespace frontend\controllers;

use frontend\models\Group;
use Yii;
use frontend\models\User;
use frontend\models\UserSearch;
use yii\filters\AccessControl;
use yii\helpers\ArrayHelper;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * UserController implements the CRUD actions for User model.
 */
class UserController extends Controller
{
    /**
     * @inheritdoc
     */
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
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all User models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new UserSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single User model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new User model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $user = new User();
        $curUser = \Yii::$app->getUser();
        $groupId = \common\models\User::find()->select('group_id')->where(['id' => $curUser->id])->scalar();

        if ($curUser->can('admin')) {
            $groups = Group::find()->asArray()->all();
            $groups = ArrayHelper::map($groups, 'group_id', 'group_name');
        } else {
            $groups = Group::find()->where(['group_id' => $groupId])->asArray()->one();
            $groups = ArrayHelper::map($groups, 'group_id', 'group_name');
        }


        Yii::trace(json_encode($groups));

        if ($user->load(Yii::$app->request->post())) {

            $user->username = Yii::$app->security->generateRandomString(12);
            $password = Yii::$app->security->generateRandomString(12);
            $user->setPassword($password);
            $user->generateAuthKey();
            $user->created_at = time();
            $user->updated_at = time();
            $user->status = 10;

            if ($user->save()) {

                $auth = Yii::$app->authManager;
                $stRole = $auth->getRole('student');
                $auth->assign($stRole, $user->getId());

                return $this->redirect(['view', 'id' => $user->id]);
            } else {
                Yii::trace(json_encode($user->errors));
                return $this->render('create', [
                    'model' => $user,
                    'groups' => $groups
                ]);
            }

        } else {
            return $this->render('create', [
                'model' => $user,
                'groups' => $groups
            ]);
        }
    }

    /**
     * Updates an existing User model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing User model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the User model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return User the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = User::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
