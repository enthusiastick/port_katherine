class BetweenGameMailer < ApplicationMailer
  def lock_notification(bgs_id)
    @bgs = BetweenGame.find(bgs_id)
    mail to: "director@portkatherine.com", subject: lock_notification_subject(@bgs)
  end

  private

  def lock_notification_subject(between_game)
    between_game.event.present? ? lock_notification_subject_with_event(between_game) : lock_notification_subject_without_event(between_game)
  end

  def lock_notification_subject_with_event(between_game)
    "[PK] #{between_game.user.label} has locked BGS for #{between_game.event.name}: #{between_game.title}"
  end

  def lock_notification_subject_without_event(between_game)
    "[PK] #{between_game.user.label} has locked BGS: #{between_game.title}"
  end
end
