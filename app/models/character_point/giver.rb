class CharacterPoint::Giver
  def initialize(params, user_id)
    @user = User.find(user_id)
    @points = params[:points]
    @reason = params[:reason]
    @recipients = User.where(handle: params[:users].map { |user| user["value"] })
  end

  attr_reader :recipients

  def give!
    ApplicationRecord.transaction do
      @recipients.each do |recipient|
        new_available_total = recipient.available += @points
        tally = Tally.new(
          annotation: "[#{new_available_total}]",
          description: "granted #{@points} CP (#{@reason}).",
          recipient: recipient,
          user: @user
        )
        tally.save && recipient.update(available: new_available_total)
      end
    end
  end
end
