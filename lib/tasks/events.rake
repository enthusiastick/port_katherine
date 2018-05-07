require "optparse"

namespace :events do
  desc "Close an event and award CP to checked-in players"
  task close: :environment do
    # EXAMPLE: rake events:close -- --slug=spring-2018
    options = {
      points: 2,
      slug: nil
    }

    o = OptionParser.new

    o.banner = "Usage: rake events:close [options]"
    o.on('-s SLUG', '--slug SLUG') { |slug|
      options[:slug] = slug
    }
    o.on('-p POINTS', '--points POINTS') { |points|
      options[:points] = points.to_i
    }

    # return `ARGV` with the intended arguments
    args = o.order!(ARGV) {}

    o.parse!(args)

    event = Event.find_by(slug: options[:slug])
    if event.present? && event.closed_at.nil?
      ApplicationRecord.transaction do
        event.bookings.player.where.not(checked_in_at: nil).each do |booking|
          new_available_total = booking.user.available += options[:points]
          tally = Tally.new(
            annotation: "[#{new_available_total}]",
            description: "received #{options[:points]} CP (#{booking.event.name} attendance).",
            recipient: booking.user,
            user: booking.user
          )
          tally.save && booking.user.update(available: new_available_total)
        end
        event.update(closed_at: Time.now)
      end
    else
      puts "No event found!"
    end
  end
end
