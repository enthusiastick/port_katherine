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

    closer = options[:points].present? ? EventCloser.new(options[:slug], options[:points]) : EventCloser.new(options[:slug])

    if closer.close!
      puts "Done."
    else
      puts "Failed."
    end
  end
end
