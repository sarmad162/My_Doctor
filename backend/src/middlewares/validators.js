export const SaveUser = (req, res) => {
    req.checkBody('name')
        .notEmpty()
        .withMessage('الاسم مطلوب');

    req.checkBody('email')
        .notEmpty()
        .withMessage('البريد الالكترونى مطلوب');

    req.checkBody('email')
        .isEmail()
        .withMessage('صيغة البريد الالكترونى غير صحيحة ');

    req.checkBody('password')
        .notEmpty()
        .withMessage('كلمة المرور مطلوبة');

    req.checkBody('userType')
        .notEmpty('userType')
        .withMessage('نوع المستخدم مطلوب');
}