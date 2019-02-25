namespace :cycle do
  desc "Reset all points spent and gifts given counters to 0."
  task reset: :environment do
    puts "Reset the cycle: are you sure? [y/N]"
    input = STDIN.gets.chomp
    if input.downcase == "y"
      Character.where("spent_cycle > ?", 0).update(spent_cycle: 0)
      User.where("received_cycle > ?", 0).update(received_cycle: 0)
      print "Reset complete."
    else
      raise "Aborting cycle reset"
    end
  end
end
