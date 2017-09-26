address = "Camp Middlesex, 1031 Erickson Rd, Ashby, MA 01431"
description = "h4. From points East/North\r\n * Take Route 2 towards Fitchburg.\r\n * Get off at Exit 32 for Route 13 North (1st exit after I-190 or last exit BEFORE I-190 if coming from Western Mass/Vermont).\r\n * The exit is for Leominster/Lunenburg - At end of ramp, take a right onto 13 North. \r\n * Go under train track bridge bear left (staying on 13 North).\r\n * You should pass old Whalom Park on your right.\r\n * When you come to a Walmart plaza, take a left onto route 2A, and follow road until you come to a big 4 way intersection with John Fitch Highway (you will see a Dunkin' Donuts and Walgreens on your left).\r\n * Get into the far right lane, and take a right onto John Fitch Highway (it's the name of the road) at this intersection.\r\n * Follow John Fitch for about 2 miles past a planatarium and baseball/hockey field until you come to an intersection with Ashby State Road (there is an ice cream/pizza place at this intersection)\r\n * Take a right onto Ashby State Road, and follow for about 5 miles, until it merges with 119. Just keep going staight!\r\n * On 119, you should go straight into Ashby center and should see a sign for Camp Middlesex across from the Ashby market.\r\n * Take a left onto South St. before Ashby market.\r\n * Take a left at the fork in the road. There should be a sharp curve in road after the fork.\r\n * Turn left at top of hill (Erickson Rd.) Drive slowly, because it comes up quickly, there will be a sign for Camp Middlesex here.\r\n * Follow the signs to park, and welcome to 4-H Camp Middlesex!\r\n\r\nh4. From points West \r\n * Take Route 2 east towards Boston\r\n * Get off at exit 24, Route 140 North\r\n * Turn left at the end of the exit ramp to go north on Route 140\r\n * Continue of Route 140 for about 3 miles, until you come up to a set of strobe red lights, this is Route 101\r\n * Turn right onto 101 and continue for about 5 miles into Ashburnham (you will go past a Mobil station, post office, and Cushing Academy).\r\n * Route 101 will stop in the center of Ashburnham, and you will turn right and then left, continuing on 101 until it meets 119 (about 8 miles).\r\n * Turn Right onto Route 119, and follow 119 for about 5 miles into the center of Ashby.\r\n * Take a Right onto South St. after the Ashby Market\r\n * Bear left at the fork in the road. There should be a sharp curve in the road after the fork.\r\n * Turn left at the top of the hill (Erickson Rd.) into Camp.\r\n \r\nh4. From points South\r\n * Take 84 East (Conn to Mass) to Mass Pike (90)\r\n * Take Mass Pike (90) East\r\n * Exit 10 off Mass Pike (I-395/Auburn/I-290/Worcester)\r\n * Merge onto I-290 Worcester (towards Worcester ~ 9 miles)\r\n * Exit 19-20 off I-290 (Towards I-190)\r\n * Merge onto I-190 North (~19 miles)\r\n * Rt. 2 West (only 1 exit to Rt. 32/13N)\r\n * Go to step 2 of the \"From points East/West/North\" directions above\r\n\r\nh4. Boston - Fitchburg Commuter Rail (One-way fare : $5.75)"
latitude = 42.665532
longitude = -71.819273

event1 = Event.find_or_initialize_by(name: "Spring 2018")
unless event1.persisted?
  event1.assign_attributes(start_time: Time.new(2017, 5, 4, 20, 0, 0, "-04:00"), end_time: Time.new(2018, 5, 6, 14, 0, 0, "-04:00"), address: address, description: description, latitude: latitude, longitude: longitude)
  event1.save
end

event2 = Event.find_or_initialize_by(name: "Summer 2018")
unless event2.persisted?
  event2.assign_attributes(start_time: Time.new(2018, 6, 15, 20, 0, 0, "-04:00"), end_time: Time.new(2018, 6, 17, 14, 0, 0, "-04:00"), address: address, description: description, latitude: latitude, longitude: longitude)
  event2.save
end

event3 = Event.find_or_initialize_by(name: "Fall 2018")
unless event3.persisted?
  event3.assign_attributes(start_time: Time.new(2018, 9, 14, 20, 0, 0, "-04:00"), end_time: Time.new(2018, 9, 16, 14, 0, 0, "-04:00"), address: address, description: description, latitude: latitude, longitude: longitude)
  event3.save
end

event4 = Event.find_or_initialize_by(name: "Winter 2018")
unless event4.persisted?
  event4.assign_attributes(start_time: Time.new(2018, 10, 19, 20, 0, 0, "-04:00"), end_time: Time.new(2018, 10, 21, 14, 0, 0, "-04:00"), address: address, description: description, latitude: latitude, longitude: longitude)
  event4.save
end
