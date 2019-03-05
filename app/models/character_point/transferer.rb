class CharacterPoint::Transferer
  def initialize(params)
    @donor = User.find_by(handle: params[:donor_handle])
    @recipient = User.find_by(handle: params[:recipient_handle])
    @points = params[:points].to_f
    @tallies = Array.new
  end

  attr_reader :tallies

  def give!
    ApplicationRecord.transaction do
      debit_from_donor
      credit_to_recipient
      @donor.save && @recipient.save && tallies.map(&:save)
    end
  end

  private

  def credit_to_recipient
    new_recipient_total = @recipient.available += @points
    @recipient.assign_attributes(available: new_recipient_total)
    @tallies << Tally.new(
      annotation: "[#{new_recipient_total}]",
      description: "received #{@points} CP from #{@donor.label}.",
      recipient: @recipient,
      user: @recipient
    )
  end

  def debit_from_donor
    new_donor_total = @donor.available -= @points
    if new_donor_total >= 0
      @donor.assign_attributes(available: new_donor_total)
      @tallies << Tally.new(
        annotation: "[#{new_donor_total}]",
        description: "gifted #{@points} CP to #{@recipient.label}.",
        recipient: @donor,
        user: @donor
      )
    else
      raise ActiveRecord::RecordInvalid
    end
  end
end
