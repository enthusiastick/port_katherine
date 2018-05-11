class Api::V1::NextController < Api::ApiController
  def index
    render json: {
      next_event: {
        bgs_deadline_in_words: bgs_deadline_in_words,
        distance_of_time_in_words_to_now: distance_of_time_in_words_to_now,
        name: name,
        slug: slug,
        time_ago_in_words: time_ago_in_words
      }
    }
  end

  private

  def next_event
    @next_event ||= Event.upcoming.soonest_first.first
  end

  def name
    @name ||= next_event.present? ? next_event.name : nil
  end

  def slug
    @slug ||= next_event.present? ? next_event.slug : nil
  end

  def bgs_deadline_in_words
    @bgs_deadline_in_words =
      (next_event.present? && next_event.bgs_deadline.present? && next_event.bgs_deadline.future?) ? ::ActionController::Base.helpers.distance_of_time_in_words_to_now(next_event.bgs_deadline) : nil
  end

  def distance_of_time_in_words_to_now
    @distance_of_time_in_words_to_now =
      (next_event.present? && next_event.start_time.future?) ? ::ActionController::Base.helpers.distance_of_time_in_words_to_now(next_event.start_time).capitalize : nil
  end

  def time_ago_in_words
    @time_ago_in_words =
      (next_event.present? && next_event.start_time.past?) ? ::ActionController::Base.helpers.time_ago_in_words(next_event.start_time) : nil
  end
end
