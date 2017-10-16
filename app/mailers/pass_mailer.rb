class PassMailer < ApplicationMailer
  def purchase_notification(pass_id, user_id)
    @pass = Pass.find(pass_id)
    @user = User.find(user_id)
    @receipt = Receipt.where(pass: @pass, user: @user).last
    mail to: "staff@portkatherine.com", subject: "[PK] #{@pass.name} purchased by #{@user.full_name}"
  end
end
