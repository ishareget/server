import Router from 'koa-router';
import carousel from './api/carousel';
import log from './api/log';
import mission from './api/mission';
import participate from './api/participate';
import record from './api/record';
import student from './api/student';
import teacher from './api/teacher';
import volunteer from './api/volunteer';
import upload from './api/upload';
import user from './api/user';
import group from './api/group';
import notification from './api/notification';

const router = new Router();

router.post('/', async (ctx, next) => {
    ctx.body = {
        Message: 'Welcome to API'
    }
})

router.get('/', async (ctx, next) => {

    let cip = ctx.request.headers['x-forwarded-for'];

    if (cip === undefined) {
        cip = ctx.request.ip === '::1' ? '127.0.0.1' : ctx.request.ip;
    }

    ctx.body = {
        status: cip,
        user: {
            1: '學生',
            2: '老師',
            3: '志工',
            4: '管理員'
        },
        mission: {
            1: '展演任務',
            2: '影片任務',
            3: '旅遊任務',
            4: '運動任務',
            5: '美術任務',
            6: '環保任務',
        },
        student_status: ['已參加', '已提交', '已審核', '已退回'],
        teacher_status: ['審核中', '已下架', '已上架', '已退回'],
        tree: {
            student: [
                '/student/   後台學童列表',
            ],
            teacher: [
                '/teacher/   後台老師列表',
            ],
            volunteer: [
                '/volunteer/ 後台志工列表',
            ],
            group: [
                '/group/         單位資料取得(用於後台)',
                '/group/id/:uid  單筆單位資料取得(用於後台)'
            ],
            record: [
                '/record/       兌換記錄查詢',
                '/record/create 新增兌換紀錄'
            ],
            mission: [
                '/mission/                首頁顯示任務用(無登入)',
                '/mission/id/:uid         點進去單獨任務用',
                '/mission/group/:uid      首頁顯示任務用(有登入，篩選單位任務)',
                '/mission/user/:uid 老師任務列表列出所有同單位的任務',
                '/mission/type            任務型態查詢',
                '/mission/create          建立任務',
                '/mission/update          修改任務內容',
                '/mission/delete          刪除任務',
                '/mission/give            admin發送點數',
                '/mission/verify          老師審核心得、退回心得、還原心得用',
                '/mission/signature       簽到狀態顯示'
            ],
            participate: [
                '/participate/missionexp     取得學生心得包含任務資訊或後台取得已審核的學生心得用',
                '/participate/status         老師任務列表(以狀態分類)',
                '/participate/homepage/:uid  取得學生所參與過的任務(個人主頁)',
                '/participate/create         填寫心得',
                '/participate/update         修改心得內容',
                '/participate/delete         刪除心得'
            ],
            user: [
                '/user/login           登入',
                '/user/userinfo        取得使用者詳細資料',
                '/user/permission/:uid 取得使用者權限',
                '/user/create          新增使用者帳號(admin後台用)',
                '/user/update          修改使用者資訊',
                '/user/delete          刪除使用者(admin後台用)'
            ],
            log: [
                '/log/      列出登入紀錄',
            ],
            carousel: [
                '/carousel/        列出所有輪播圖',
                '/carousel/create  新增輪播圖',
                '/carousel/update  修改輪播圖',
                '/carousel/delete  刪除輪播圖'
            ],
            upload: [
                '/upload/participate  學生填寫心得照片上傳',
                '/upload/mission      任務圖片上傳',
                '/upload/carousel     輪播圖上傳',
                '/upload/profile      使用者大頭貼上傳'
            ],
            notification: [
                '/notification/username/:username 抓取該使用者的通知訊息',
                '/notification/create             增加通知'
            ]
        }
    }
})

router.use('/carousel', carousel.routes(), carousel.allowedMethods());
router.use('/log', log.routes(), log.allowedMethods());
router.use('/mission', mission.routes(), mission.allowedMethods());
router.use('/participate', participate.routes(), participate.allowedMethods());
router.use('/record', record.routes(), record.allowedMethods());
router.use('/student', student.routes(), student.allowedMethods());
router.use('/teacher', teacher.routes(), teacher.allowedMethods());
router.use('/volunteer', volunteer.routes(), volunteer.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/group', group.routes(), group.allowedMethods());
router.use('/notification', notification.routes(), notification.allowedMethods());

export default router;