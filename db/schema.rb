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

ActiveRecord::Schema.define(version: 20171018150506) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.datetime "checked_in_at"
    t.boolean "paid", default: false
    t.integer "event_id", null: false
    t.integer "category", default: 0, null: false
    t.integer "receipt_id"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id", "user_id"], name: "index_bookings_on_event_id_and_user_id", unique: true
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["handle"], name: "index_users_on_handle", unique: true
    t.index ["non_sequential_id"], name: "index_users_on_non_sequential_id", unique: true
  end

end
