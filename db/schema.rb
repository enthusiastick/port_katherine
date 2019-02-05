# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_05_192428) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "backstories", force: :cascade do |t|
    t.text "body", null: false
    t.integer "character_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "between_games", force: :cascade do |t|
    t.text "body", null: false
    t.integer "category", default: 0, null: false
    t.integer "character_id", null: false
    t.integer "event_id"
    t.string "non_sequential_id", null: false
    t.integer "respondent_id"
    t.text "response"
    t.string "response_title"
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "assignee_id"
    t.datetime "response_released_at"
    t.index ["non_sequential_id"], name: "index_between_games_on_non_sequential_id", unique: true
  end

  create_table "bookings", force: :cascade do |t|
    t.datetime "checked_in_at"
    t.boolean "paid", default: false
    t.integer "event_id", null: false
    t.integer "category", default: 0, null: false
    t.integer "receipt_id"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "character_id"
    t.text "lodging_comments"
    t.boolean "tenting", default: false, null: false
    t.datetime "lodging_questionnaire_completed_at"
    t.text "feedback"
    t.datetime "feedback_entered_at"
    t.index ["event_id", "user_id"], name: "index_bookings_on_event_id_and_user_id", unique: true
  end

  create_table "character_headers", force: :cascade do |t|
    t.integer "character_id", null: false
    t.integer "header_id", null: false
    t.boolean "true_header", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id", "header_id"], name: "index_character_headers_on_character_id_and_header_id", unique: true
  end

  create_table "character_skills", force: :cascade do |t|
    t.integer "character_id", null: false
    t.integer "skill_id", null: false
    t.integer "ranks", default: 0, null: false
    t.boolean "locked", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id", "skill_id"], name: "index_character_skills_on_character_id_and_skill_id", unique: true
  end

  create_table "characters", force: :cascade do |t|
    t.decimal "available", precision: 6, scale: 2, default: "34.0"
    t.integer "birthplace", null: false
    t.integer "cycle_spending_cap", default: 20, null: false
    t.integer "first_profession_id", null: false
    t.integer "first_true_header_id", null: false
    t.text "history"
    t.string "name", null: false
    t.string "non_sequential_id", null: false
    t.integer "spent", default: 0, null: false
    t.integer "spent_cycle", default: -30, null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "archived_at"
    t.integer "archived_by_id"
    t.decimal "gifts_received_cycle", precision: 4, scale: 2, default: "0.0"
    t.index ["non_sequential_id"], name: "index_characters_on_non_sequential_id", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.boolean "automated", default: false, null: false
    t.text "body", null: false
    t.integer "between_game_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "event_passes", force: :cascade do |t|
    t.integer "event_id", null: false
    t.integer "pass_id", null: false
    t.index ["event_id", "pass_id"], name: "index_event_passes_on_event_id_and_pass_id", unique: true
  end

  create_table "events", force: :cascade do |t|
    t.string "address"
    t.boolean "archived", default: false
    t.text "description"
    t.datetime "end_time", null: false
    t.float "latitude"
    t.float "longitude"
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "start_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "player_cap", default: 75, null: false
    t.boolean "show_lodging_questionnaire", default: false, null: false
    t.datetime "closed_at"
    t.datetime "bgs_deadline"
    t.datetime "limited_registration_opened_at"
    t.datetime "unlimited_registration_opened_at"
    t.index ["slug"], name: "index_events_on_slug", unique: true
  end

  create_table "header_skills", force: :cascade do |t|
    t.integer "header_id", null: false
    t.integer "skill_id", null: false
    t.boolean "hidden", default: true
    t.boolean "true_skill", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["header_id", "skill_id"], name: "index_header_skills_on_header_id_and_skill_id", unique: true
  end

  create_table "headers", force: :cascade do |t|
    t.integer "category", default: 2, null: false
    t.integer "season", default: 0, null: false
    t.string "name", null: false
    t.integer "linked_first_skill_id"
    t.integer "parent_header_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_headers_on_name", unique: true
  end

  create_table "lodging_preferences", force: :cascade do |t|
    t.integer "booking_id", null: false
    t.integer "user_id", null: false
    t.boolean "favored", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id", "user_id"], name: "index_lodging_preferences_on_booking_id_and_user_id", unique: true
  end

  create_table "passes", force: :cascade do |t|
    t.boolean "active", default: true
    t.boolean "earlybird_discount", default: true
    t.string "name", null: false
    t.decimal "price", precision: 8, scale: 2, null: false
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_passes_on_slug", unique: true
  end

  create_table "receipts", force: :cascade do |t|
    t.decimal "amount", precision: 8, scale: 2, null: false
    t.string "braintree_transaction_id", null: false
    t.string "cardholder_name"
    t.string "image_url"
    t.inet "ip_address"
    t.integer "pass_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "cost_increase_amount", default: 1, null: false
    t.integer "cost_increase_rank", default: 10, null: false
    t.integer "max_rank", default: 0, null: false
    t.integer "starting_cost", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tallies", force: :cascade do |t|
    t.string "annotation"
    t.text "description", null: false
    t.integer "character_id"
    t.integer "recipient_id"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "confirmation_digest"
    t.datetime "confirmed_at"
    t.string "email", null: false
    t.integer "failed_sign_in_attempts", default: 0
    t.string "first_name", null: false
    t.string "handle", null: false
    t.string "last_name", null: false
    t.datetime "last_signed_in_at"
    t.string "non_sequential_id", null: false
    t.string "password_digest"
    t.string "password_reset_digest"
    t.datetime "password_reset_sent_at"
    t.string "remember_digest"
    t.integer "role", default: 0, null: false
    t.integer "sign_in_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "self_report"
    t.date "new_player_discounted_at"
    t.decimal "available", precision: 6, scale: 2, default: "0.0"
    t.integer "default_character_id"
    t.string "forum_title"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["handle"], name: "index_users_on_handle", unique: true
    t.index ["non_sequential_id"], name: "index_users_on_non_sequential_id", unique: true
  end

end
