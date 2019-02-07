namespace :cycle do
  desc "Reset all points spent and gifts given counters to 0."
  task reset: :environment do
    puts "Reset the cycle: are you sure? [y/N]"
    input = STDIN.gets.chomp
    if input.downcase == "y"
      Character.all.update(spent_cycle: 0)
      User.all.update(received_cycle: 0)
      print "Reset complete."
    else
      raise "Aborting cycle reset"
    end
  end
end
