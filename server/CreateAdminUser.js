/*
 Steps to create an admin account:

 1) Edit the following line and *modify* the password
 2) Copy and paste it into bash

 ==> meteor will run and create the user.
 That's it ! You might want to clear your ~/bash_history file afterwards

 QUERYTOOL_ADMINPASSWORD=your_password_CHANGE_IT QUERYTOOL_CREATEADMIN=TRUE QUERYTOOL_ADMINUSER=admin QUERYTOOL_ADMINEMAIL=someone@somewhere.com meteor

 */
function SetupAdminAccount() {

    if ( ! process.env.QUERYTOOL_CREATEADMIN)
        return;
    console.log("Creating admin account : " + process.env.QUERYTOOL_ADMINUSER + "(" + process.env.QUERYTOOL_ADMINEMAIL + ")");
    idAdmin = Accounts.createUser({
        username: process.env.QUERYTOOL_ADMINUSER,
        email: process.env.QUERYTOOL_ADMINEMAIL,
        password: process.env.QUERYTOOL_ADMINPASSWORD,
        profile: { name: process.env.QUERYTOOL_ADMINUSER }
    });

    Roles.addUsersToRoles(idAdmin, ["admin", "manage-users", "manage-queries"]);
}

SetupAdminAccount();
