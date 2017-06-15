<?php
namespace frontend\controllers;

use frontend\models\Group;
use frontend\models\Hours;
use frontend\models\Notification;
use frontend\models\Students;
use frontend\models\Today;
use Yii;
use yii\base\InvalidParamException;
use yii\db\ActiveQuery;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\LoginForm;
use frontend\models\PasswordResetRequestForm;
use frontend\models\ResetPasswordForm;
use frontend\models\SignupForm;
use frontend\models\ContactForm;
use common\models\User;

/**
 * Site controller
 */
class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'signup', 'index', 'post', 'today', 'notifications'],
                'rules' => [
                    [
                        'actions' => ['notifications'],
                        'allow' => true,
                        'roles' => ['?', '@'],
                    ],
                    [
                        'actions' => ['signup'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['post', 'today', 'index'],
                        'allow' => true,
                        'roles' => ['admin', 'steward']
                    ],
                    [
                        'actions' => ['post', 'today', 'index'],
                        'allow' => false,
                        'roles' => ['student'],
                        'denyCallback' => function ($rule, $action) {
                            return $this->redirect(['students/index']);
                        }
                    ]
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post', 'get'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }
    
    public function actionPost()
    {

        $students = Yii::$app->request->post('students', []);
        $res = [];
        foreach ($students as $student)
        {
            $model = Today::findOne(['student_id' => $student['id']]);
            $model->student_id = $student['id'];
            $model->hours = $student['hours'];
            $model->is_good = $student['is_good'];
            if ($model->validate())
            {
                $model->save();
                $res[] = [$student['id'] => ['done' => true]];
            } else {
                $res[] = [$student['id'] => ['done' => false, 'error' => $model->getErrors()]];
            }

        }
        echo json_encode($res);
    }

    public function actionCommit()
    {
        if (Yii::$app->request->isPost)
        {
            $db = Yii::$app->getDb();
            $command = $db->createCommand('CALL move_to_hours()');
            $command->execute();
            return json_encode(['done' => true]);

        }
        return json_encode(['done' => false]);
    }

    public function actionNotifications()
    {
        /*$auth = Yii::$app->authManager;
        $user = Yii::$app->getUser();
        $roles = array_keys($auth->getRolesByUser($user->id));
        $groupId = \common\models\User::find()->select(['group_id'])->where(['id' => $user->id])->scalar();
        $roles[] = 'group_' . $groupId;

        $notifications = Notification::find()
            ->where(['or', ['to' => $user->id], ['in', 'target', $roles]])
            ->asArray()
            ->all();

        $nfResponse = [];
        
        foreach ($notifications as $notification) {
            $heading = 'Пользователь добавлен:';
            switchMonth ($notification['type'])
            {
                case 3:
                    $heading = 'Администратор добавлен:';
                    break;
                case 2:
                    $heading = 'Староста добавлен:';
                    break;
            }
            
            
        }*/

        return json_encode(['test' => 'test']);
    }

    public function actionToday()
    {
        $user = \Yii::$app->getUser();
        $groupId = \common\models\User::find()->select('group_id')->where(['id' => $user->id])->scalar();
        Yii::trace("TODAY::GID $groupId");
        $currentHours = Today::find()
                             ->where(['group_id' => $groupId])
	                        ->andWhere([
	                        	'<>',
		                        'student_id',
		                        $user->id
	                        ])
                             ->asArray()
                             ->all();

        foreach ($currentHours as $key => $value) {
            //$hours = str_split($item['hours']);
            $currentHours[$key]['hours'] = str_split($currentHours[$key]['hours']);
            $currentHours[$key]['hours_good'] = str_split($currentHours[$key]['hours_good']);

            foreach ($currentHours[$key]['hours'] as $index => $val) {
                $currentHours[$key]['hours'][$index] = intval($val);
            }
        }
        echo json_encode($currentHours);

    }

    public function actionIndex()
    {
        $user = \Yii::$app->getUser();
        $groupId = User::find()->select('group_id')->where(['id' => $user->id])->scalar();

        $auth = \Yii::$app->authManager;
        $ids = $auth->getUserIdsByRole('student');

        $users = User::find()->where(['and', ['in', 'id', $ids], ['group_id' => $groupId]])->orderBy('concat(`last_name`, `first_name`)')->all();
        //Yii::trace("Group ID: $groupId");
        //Yii::trace("User ID: $user->id");
        Yii::trace(json_encode($users));

        $controlPanel = false;

        if ($user->can('su'))
        {
            $controlPanel = 'Hello, admin!';
        }

        return $this->render('index', [
            'students' => $users,
            'controlPanel' => $controlPanel
        ]);

        
    }

    /**
     * Logs in a user.
     *
     * @return mixed
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        } else {
            return $this->render('login', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Logs out the current user.
     *
     * @return mixed
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return mixed
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail(Yii::$app->params['adminEmail'])) {
                Yii::$app->session->setFlash('success', 'Thank you for contacting us. We will respond to you as soon as possible.');
            } else {
                Yii::$app->session->setFlash('error', 'There was an error sending email.');
            }

            return $this->refresh();
        } else {
            return $this->render('contact', [
                'model' => $model,
            ]);
        }
    }

    public function actionHours()
    {
        $group_id = User::find()->select(['group_id'])->where(['id' => Yii::$app->getUser()->getId()])->scalar();

        $groupHours = Hours::find()->where(
            [
                'and',
                ['group_id' => $group_id],
                ['>=', 'date', date('Y-m-01')]
            ]
        )
            ->orderBy('date, student_id')
            ->asArray()
            ->all();

        return json_encode($groupHours);
    }

	public function actionTest( $year, $month ) {

		$group_id = User::find()->select(['group_id'])->where(['id' => Yii::$app->getUser()->getId()])->scalar();
		$time = mktime(0, 0, 0, intval($month) + 1, 1, intval($year));
		$users = User::find()
		             ->with([
			             'hours' => function(ActiveQuery $query)use ($time) {
				             $query->andWhere([
					             'and',
					             ['>=', 'date', date('Y-m-01', $time)],
					             ['<=', 'date', date('Y-m-31', $time)]
				             ])->orderBy('date');
			             }
		             ])
		             ->where([
			             'AND',
			             'group_id' => $group_id,
			             ['<>', 'id', 1]
		             ])
		             ->orderBy('concat(`last_name`, `first_name`)')
		             ->asArray()
		             ->all();
		echo json_encode(['students' => $users]);
		return;
    }

    /**
     * Displays about page.
     *
     * @return mixed
     */
    public function actionAbout()
    {
        return $this->render('about');
    }

    /**
     * Signs user up.
     *
     * @return mixed
     */
    public function actionSignup()
    {
        $model = new SignupForm();
        $groups = Group::find()
            ->select(['abbrevation', 'group_id'])
            ->indexBy('group_id')
            ->column();
        
        if ($model->load(Yii::$app->request->post())) {
            if ($user = $model->signup()) {
                if (Yii::$app->getUser()->login($user)) {
                    return $this->redirect(['site/wait-for-check']);
                    //return $this->goHome();
                } else {
                }
            }
        }

        return $this->render('signup', [
            'model' => $model,
            'groups' => $groups
        ]);
    }

    public function actionWaitForCheck()
    {
        return $this->render('wait-for-check');
    }

    /**
     * Requests password reset.
     *
     * @return mixed
     */
    public function actionRequestPasswordReset()
    {
        $model = new PasswordResetRequestForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail()) {
                Yii::$app->session->setFlash('success', 'Check your email for further instructions.');

                return $this->goHome();
            } else {
                Yii::$app->session->setFlash('error', 'Sorry, we are unable to reset password for email provided.');
            }
        }

        return $this->render('requestPasswordResetToken', [
            'model' => $model,
        ]);
    }

    /**
     * Resets password.
     *
     * @param string $token
     * @return mixed
     * @throws BadRequestHttpException
     */
    public function actionResetPassword($token)
    {
        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {
            Yii::$app->session->setFlash('success', 'New password was saved.');

            return $this->goHome();
        }

        return $this->render('resetPassword', [
            'model' => $model,
        ]);
    }
}
