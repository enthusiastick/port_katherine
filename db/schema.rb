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

ActiveRecord::Schema.define(version: 20170927194222) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.datetime "checked_in_at"
    t.boolean "paid", default: false
    t.integer "pass_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pass_id", "user_id"], name: "index_bookings_on_pass_id_and_user_id", unique: true
    t.index ["pass_id"], name: "index_bookings_on_pass_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "event_passes", force: :cascade do |t|
    t.integer "event_id"
    t.integer "pass_id"
    t.index ["event_id", "pass_id"], name: "index_event_passes_on_event_id_and_pass_id", unique: true
    t.index ["event_id"], name: "index_event_passes_on_event_id"
    t.index ["pass_id"], name: "index_event_passes_on_pass_id"
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
    t.index ["slug"], name: "index_events_on_slug", unique: true
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["handle"], name: "index_users_on_handle", unique: true
    t.index ["non_sequential_id"], name: "index_users_on_non_sequential_id", unique: true
  end

end
