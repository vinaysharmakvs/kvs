(() => {
  const lab = document.querySelector("[data-maths-lab]");
  if (!lab) return;

  const c = (title, goal, explain, alternate, visual, exampleQuestion, steps, checkQuestion, options, answer, hint) => ({ title, goal, explain, alternate, visual, exampleQuestion, steps, check: { question: checkQuestion, options, answer, hint } });
  const topic = (title, icon, description, concepts) => ({ title, icon, description, concepts });

  const curriculum = {
    ukg: {
      label: "UKG",
      topics: [
        topic("Numbers 1–20", "🔢", "Count, recognise and compare small numbers", [
          c("Count objects to 10", "Touch each object once and say the numbers in order.", "Counting tells us how many objects are in a group. Point to one object for every number you say.", "Move each object into a basket as you count. The last number tells the total.", { type: "objects", groups: [5], item: "⭐", equation: "1, 2, 3, 4, 5" }, "How many apples are here? 🍎 🍎 🍎 🍎", ["Point to each apple once.", "Say: 1, 2, 3, 4.", "There are 4 apples."], "How many stars? ⭐ ⭐ ⭐", ["2", "3", "4"], "3", "Touch each star once while counting."),
          c("Read numbers 1–10", "Connect a number symbol with its quantity.", "The symbol 6 is a quick way to show a group of six things.", "Build the number using dots, then match the dot group to the numeral.", { type: "match", number: 6, item: "●" }, "Match the group ● ● ● ● ● to a number.", ["Count the dots: 1, 2, 3, 4, 5.", "The numeral for five is 5."], "Which numeral shows seven?", ["6", "7", "8"], "7", "Say the numbers slowly: six, seven, eight."),
          c("Count from 11–20", "Understand that teen numbers are ten and some more.", "Every teen number has one full group of ten and extra ones.", "Use a full ten-frame and add loose counters beside it.", { type: "tenframe", filled: 10, extras: 4, equation: "10 + 4 = 14" }, "Make 13 using ten and extra ones.", ["Fill one group of 10.", "Add 3 more ones.", "10 and 3 more make 13."], "10 and 6 more make which number?", ["14", "16", "60"], "16", "Start at ten and count six more."),
          c("Before, after and between", "Find a number’s neighbours.", "Numbers stand in an order. The number before is one less; the number after is one more.", "Imagine each number lives in a house with one neighbour on each side.", { type: "numberline", values: [3, 4, 5, 6, 7], active: 5 }, "What comes before and after 5?", ["Look left of 5: 4.", "Look right of 5: 6.", "So: 4, 5, 6."], "Which number comes after 8?", ["7", "8", "9"], "9", "Move one step forward from 8."),
          c("More, fewer and equal", "Compare two groups without guessing.", "A group has more when it contains extra objects. Equal groups have exactly the same number.", "Pair one object from the first group with one from the second. Any objects left over show the larger group.", { type: "compare", left: 5, right: 3, item: "🍓" }, "Which group has fewer: 4 balls or 2 balls?", ["Pair the balls.", "The group of 2 finishes first.", "Two balls are fewer."], "Which number is more?", ["4", "7", "They are equal"], "7", "The number farther forward while counting is more."),
        ]),
        topic("Early Addition", "➕", "Put groups together and find the total", [
          c("Addition means together", "Combine two groups to make one larger group.", "The plus sign means put together. Count everything after joining the groups.", "Slide both groups into one big circle, then count the combined group.", { type: "objects", groups: [3, 2], item: "🍎", equation: "3 + 2 = 5" }, "What is 2 + 1?", ["Show 2 stars.", "Add 1 more star.", "Count all 3 stars."], "What is 4 + 2?", ["5", "6", "7"], "6", "Start with four and count two more: five, six."),
          c("Add within 5", "Use fingers or objects to add small groups.", "Keep the first number in your mind and count on for the second number.", "Hold up the first number of fingers, then raise more fingers.", { type: "objects", groups: [2, 3], item: "●", equation: "2 + 3 = 5" }, "Find 1 + 3.", ["Start with 1.", "Count on 3: 2, 3, 4.", "The total is 4."], "What is 2 + 2?", ["3", "4", "5"], "4", "Make two groups of two and count all."),
          c("Add within 10", "Count on instead of starting again.", "To add, begin at the bigger number and jump forward.", "Use a number path and make forward jumps.", { type: "numberline", values: [3, 4, 5, 6, 7], active: 3, jump: 4 }, "Find 3 + 4.", ["Start at 3.", "Jump 4 steps: 4, 5, 6, 7.", "3 + 4 = 7."], "What is 5 + 3?", ["7", "8", "9"], "8", "Start at five and count three steps forward."),
          c("Make 10", "Find number partners that total ten.", "Ten can be split into different pairs: 1 and 9, 2 and 8, 3 and 7.", "Fill the empty spaces in a ten-frame.", { type: "tenframe", filled: 7, extras: 0, equation: "7 + ? = 10" }, "How many more does 6 need to make 10?", ["A ten-frame has 10 spaces.", "Six spaces are filled, so 4 are empty.", "6 + 4 = 10."], "8 needs how many more to make 10?", ["1", "2", "3"], "2", "Count the empty spaces after filling eight."),
        ]),
        topic("Early Subtraction", "➖", "Take away, compare and find what remains", [
          c("Subtraction means take away", "Remove objects and count what remains.", "The minus sign means some objects leave the group.", "Cover or move away the objects being taken away.", { type: "takeaway", total: 5, remove: 2, item: "🍪" }, "Find 4 − 1.", ["Show 4 objects.", "Take away 1.", "Count the 3 remaining objects."], "What is 5 − 2?", ["2", "3", "4"], "3", "Show five fingers and fold down two."),
          c("Subtract within 5", "Take away from a group of five or fewer.", "Cross out the number being removed, then count the uncrossed objects.", "Act it out with toys: some stay and some leave.", { type: "takeaway", total: 4, remove: 1, item: "🐟" }, "Find 3 − 2.", ["Draw 3 circles.", "Cross out 2 circles.", "One circle remains."], "What is 4 − 2?", ["1", "2", "3"], "2", "Remove two from four and count what stays."),
          c("Subtract within 10", "Count backwards to subtract.", "Subtraction moves backwards on a number line.", "Start at the first number and make backward jumps.", { type: "numberline", values: [3, 4, 5, 6, 7], active: 7, jump: -3 }, "Find 7 − 3.", ["Start at 7.", "Jump back: 6, 5, 4.", "7 − 3 = 4."], "What is 8 − 3?", ["4", "5", "6"], "5", "Count backward three times from eight."),
          c("Find the missing part", "Understand that a whole can be split into parts.", "If we know the whole and one part, subtraction finds the missing part.", "Hide one part of a group and use the visible part to work out what is hidden.", { type: "parts", whole: 6, part: 4 }, "Six toys are in two boxes. Four are in one box. How many are in the other?", ["The whole is 6.", "One part is 4.", "6 − 4 = 2."], "5 = 3 + ?. What is missing?", ["1", "2", "3"], "2", "Count from three up to five."),
        ]),
        topic("Shapes & Space", "🔷", "See shapes, positions and patterns around us", [
          c("Circle, square, triangle, rectangle", "Recognise four common flat shapes.", "Shapes are identified by their sides and corners, not by colour or size.", "Trace the edge with your finger and count the sides and corners.", { type: "shapes", shapes: ["circle", "triangle", "square", "rectangle"] }, "Which shape has three sides?", ["Count the triangle’s sides: 1, 2, 3.", "A triangle always has three sides."], "Which shape has no straight sides?", ["Circle", "Square", "Triangle"], "Circle", "Trace the outside edge and look for corners."),
          c("Sort shapes", "Group shapes using one clear rule.", "We can sort by shape, colour, size or number of sides.", "Say your sorting rule before moving the shapes.", { type: "sort", values: ["🔴", "🔵", "🔴", "🔵", "🔴"] }, "Sort two circles and two squares by shape.", ["Make a circle group.", "Make a square group.", "Check that every shape belongs."], "Which rule sorts 🔺 🔺 ⬜ ⬜ correctly?", ["By shape", "By sound", "By name length"], "By shape", "Look for what is the same in each group."),
          c("Inside, outside, above and below", "Describe where an object is.", "Position words tell where something is compared with another object.", "Move a toy and say its new position aloud.", { type: "position", item: "🐱", place: "📦", word: "inside" }, "A bird is above a tree. Where is the tree from the bird?", ["Picture the bird on top.", "The tree is below the bird."], "The ball is inside the box. Which word tells its position?", ["ball", "inside", "box"], "inside", "Find the word that answers ‘where?’"),
          c("Continue a shape pattern", "Find the repeating part and predict what comes next.", "A pattern repeats in the same order. First find the smallest part that repeats.", "Clap the pattern as you say each shape.", { type: "pattern", values: ["●", "▲", "●", "▲", "?"] }, "What comes next: square, circle, square, circle, ...?", ["The repeating part is square, circle.", "After circle comes square."], "What comes next: 🔴 🔵 🔵 🔴 🔵 🔵 ?", ["🔴", "🔵", "🟢"], "🔴", "Find the repeating group of three."),
        ]),
        topic("Measure & Everyday Maths", "📏", "Compare size, weight, time and money", [
          c("Long and short", "Compare the length of two objects.", "An object is longer when it reaches farther from the same starting point.", "Line up both objects at one end before comparing.", { type: "measure", left: 80, right: 150 }, "Which is longer: a 5-block train or a 3-block train?", ["Start both trains at the same line.", "The 5-block train reaches farther."], "Which word describes the pencil that reaches farther?", ["Longer", "Shorter", "Lighter"], "Longer", "Compare where each pencil ends."),
          c("Heavy and light", "Compare how difficult objects are to lift.", "Heavy objects pull a balance down. Light objects stay higher.", "Pretend each hand is one side of a balance scale.", { type: "balance", left: "🪨", right: "🪶" }, "Which is usually heavier: a book or a leaf?", ["Imagine lifting both.", "The book needs more effort.", "The book is heavier."], "Which is lighter?", ["A stone", "A feather", "A chair"], "A feather", "Think about which one is easiest to lift."),
          c("Morning, afternoon and night", "Connect daily routines with parts of the day.", "We use morning, afternoon, evening and night to describe when things happen.", "Put routine picture cards in the order of your day.", { type: "day", values: ["🌅", "☀️", "🌙"] }, "When do most children sleep?", ["Morning is when the day begins.", "Night is dark and is usually bedtime."], "Breakfast usually happens in the...", ["morning", "night", "midnight"], "morning", "Think about the first meal of your day."),
          c("Know common coins", "Recognise ₹1, ₹2, ₹5 and ₹10.", "A coin’s value is shown by its number. A larger-looking coin does not always mean more value.", "Sort play coins by the number printed on them.", { type: "coins", values: [1, 2, 5, 10] }, "Which coin can pay exactly ₹5?", ["Look for the number 5.", "The ₹5 coin has value five rupees."], "Which has greater value?", ["₹2", "₹10", "They are equal"], "₹10", "Compare the printed numbers."),
        ]),
      ],
    },
    "1": {
      label: "Grade 1",
      topics: [
        topic("Numbers to 100", "💯", "Read, build, compare and order two-digit numbers", [
          c("Tens and ones", "Build a two-digit number using place value.", "In 34, the 3 means three tens and the 4 means four ones.", "Bundle ten sticks into one tens bundle and leave extra sticks as ones.", { type: "placevalue", tens: 3, ones: 4 }, "Build 26 using tens and ones.", ["Two tens make 20.", "Add 6 ones.", "20 + 6 = 26."], "How many tens and ones are in 47?", ["4 tens and 7 ones", "7 tens and 4 ones", "47 tens"], "4 tens and 7 ones", "The first digit shows tens; the second shows ones."),
          c("Read and write numbers to 100", "Connect number names and numerals.", "Number names tell the tens first and then the ones: 42 is forty-two.", "Build the number with tens and ones before reading its name.", { type: "match", number: 42, item: "forty-two" }, "Write sixty-five as a numeral.", ["Sixty means 6 tens.", "Five means 5 ones.", "The numeral is 65."], "Which numeral is eighty-one?", ["18", "81", "80"], "81", "Eighty is eight tens; then add one."),
          c("Compare numbers", "Use greater than, less than and equal to.", "Compare tens first. If the tens are equal, compare the ones.", "Imagine the greater number has the larger pile of tens bundles.", { type: "compare-numbers", left: 46, right: 39 }, "Which is greater: 52 or 57?", ["Both have 5 tens.", "Compare 2 ones and 7 ones.", "57 is greater."], "Choose the correct sign: 68 __ 63", ["<", ">", "="], ">", "The tens are equal, so compare eight ones with three ones."),
          c("Order numbers", "Arrange numbers from smallest to greatest.", "Ordering means placing numbers according to their value.", "Put each number on a number line, then read from left to right.", { type: "numberline", values: [12, 18, 24, 31, 40], active: 24 }, "Order 19, 12 and 16 from smallest to greatest.", ["Compare the ones because all have 1 ten.", "2 is smallest, then 6, then 9.", "12, 16, 19."], "Which order is smallest to greatest?", ["25, 19, 30", "19, 25, 30", "30, 25, 19"], "19, 25, 30", "Start with the number having the fewest tens."),
          c("Skip count by 2, 5 and 10", "Notice equal jumps in number patterns.", "Skip counting adds the same amount each time.", "Make equal jumps on a number line and say every landing number.", { type: "numberline", values: [0, 5, 10, 15, 20], active: 0, jump: 5 }, "Count by 5 after 10.", ["Start at 10.", "Add 5: 15.", "Add another 5: 20."], "What comes next: 2, 4, 6, 8, ...?", ["9", "10", "12"], "10", "This pattern adds two each time."),
        ]),
        topic("Addition", "➕", "Build addition strategies instead of guessing", [
          c("Add within 10", "Join groups and count on.", "Start with the bigger number and count forward for the smaller number.", "Use objects first, then hide the objects and use the number line.", { type: "objects", groups: [6, 3], item: "●", equation: "6 + 3 = 9" }, "Find 7 + 2.", ["Keep 7 in your mind.", "Count on: 8, 9.", "7 + 2 = 9."], "What is 5 + 4?", ["8", "9", "10"], "9", "Count four steps after five."),
          c("Number bonds to 10", "Recall pairs that make ten.", "Knowing ten partners makes larger addition easier.", "Use a ten-frame: filled spaces and empty spaces are partners of ten.", { type: "tenframe", filled: 6, extras: 0, equation: "6 + 4 = 10" }, "Complete 7 + ? = 10.", ["Seven spaces are filled.", "Three spaces are empty.", "7 + 3 = 10."], "Which pair makes 10?", ["6 and 3", "6 and 4", "6 and 5"], "6 and 4", "Count how many more six needs to reach ten."),
          c("Add a one-digit number to a two-digit number", "Add ones while keeping the tens.", "In 23 + 4, add four to the ones. The two tens stay the same.", "Build 23 with blocks, then add four loose ones.", { type: "placevalue-add", tens: 2, ones: 3, add: 4 }, "Find 31 + 5.", ["Keep the 3 tens.", "Add the ones: 1 + 5 = 6.", "The answer is 36."], "What is 42 + 6?", ["46", "48", "52"], "48", "Add six to the two ones; keep four tens."),
          c("Add two-digit numbers without regrouping", "Add ones to ones and tens to tens.", "Place values must stay in their columns.", "Use tens sticks and ones dots for both numbers, then combine matching places.", { type: "column", top: 23, bottom: 14, operation: "+", answer: 37 }, "Find 32 + 25.", ["Ones: 2 + 5 = 7.", "Tens: 3 + 2 = 5.", "32 + 25 = 57."], "What is 41 + 27?", ["58", "68", "78"], "68", "Add ones first, then add tens."),
          c("Addition word problems", "Decide when a story means put together.", "Words such as altogether, total and in all often signal addition.", "Draw one group for each part of the story, then join them.", { type: "story", values: ["4 birds", "+ 3 birds", "= 7 birds"] }, "Mia has 5 pencils and gets 2 more. How many now?", ["She starts with 5.", "Gets 2 more means add.", "5 + 2 = 7."], "There are 6 red balloons and 3 blue balloons. How many in all?", ["8", "9", "10"], "9", "‘In all’ asks you to put both groups together."),
        ]),
        topic("Subtraction", "➖", "Take away, compare and find missing parts", [
          c("Subtract within 10", "Take away and count backwards.", "Start from the whole and move backward by the amount taken away.", "Cross out objects or make backward jumps.", { type: "takeaway", total: 9, remove: 4, item: "●" }, "Find 8 − 3.", ["Start at 8.", "Count back: 7, 6, 5.", "8 − 3 = 5."], "What is 7 − 2?", ["4", "5", "6"], "5", "Make two backward jumps from seven."),
          c("Subtraction facts to 20", "Use known addition facts to subtract.", "Addition and subtraction belong to the same fact family.", "Cover one part of an addition triangle to reveal a subtraction fact.", { type: "fact-family", values: [7, 5, 12] }, "Use 8 + 6 = 14 to find 14 − 8.", ["Fourteen is the whole.", "Eight is one part.", "The missing part is 6."], "If 9 + 4 = 13, what is 13 − 9?", ["3", "4", "5"], "4", "Find the other part in the addition fact."),
          c("Subtract from a two-digit number", "Remove ones while keeping the tens.", "In 28 − 5, remove five ones from eight ones. The two tens remain.", "Build the number with place-value blocks, then remove loose ones.", { type: "placevalue-subtract", tens: 2, ones: 8, remove: 5 }, "Find 36 − 4.", ["Keep the 3 tens.", "Ones: 6 − 4 = 2.", "The answer is 32."], "What is 49 − 6?", ["43", "45", "53"], "43", "Remove six from nine ones and keep four tens."),
          c("Subtract two-digit numbers without regrouping", "Subtract ones from ones and tens from tens.", "Line up matching place values before subtracting.", "Use columns and place-value blocks together.", { type: "column", top: 58, bottom: 24, operation: "−", answer: 34 }, "Find 76 − 35.", ["Ones: 6 − 5 = 1.", "Tens: 7 − 3 = 4.", "76 − 35 = 41."], "What is 67 − 23?", ["34", "44", "54"], "44", "Subtract the ones and then the tens."),
          c("Subtraction word problems", "Notice when a story takes away or compares.", "Words such as left, remain and how many more can signal subtraction.", "Act out the story and watch which quantity becomes smaller.", { type: "story", values: ["8 cookies", "− 3 eaten", "= 5 left"] }, "There are 9 ducks. Four swim away. How many remain?", ["Start with 9.", "Swim away means subtract 4.", "9 − 4 = 5."], "Ria has 10 crayons and gives away 3. How many are left?", ["6", "7", "8"], "7", "Take three away from ten."),
        ]),
        topic("Shapes & Space", "🟦", "Describe, build and move with shapes", [
          c("2D shapes", "Describe flat shapes using sides and corners.", "A shape keeps its name even when it turns, changes colour or becomes larger.", "Trace and count instead of guessing from appearance.", { type: "shapes", shapes: ["circle", "triangle", "square", "rectangle"] }, "How many sides does a rectangle have?", ["Trace each straight side.", "A rectangle has four sides and four corners."], "Which shape has exactly three corners?", ["Circle", "Triangle", "Square"], "Triangle", "Count the corners one by one."),
          c("3D shapes", "Recognise solid shapes that can roll, slide or stack.", "Solid shapes have faces and take up space. A ball is like a sphere; a dice is like a cube.", "Test real objects to see whether they roll, slide or stack.", { type: "solids", values: ["sphere", "cube", "cylinder", "cone"] }, "Which solid is shaped like a can?", ["A can has two flat circles and one curved surface.", "That solid is a cylinder."], "Which shape is like a football?", ["Sphere", "Cube", "Cone"], "Sphere", "A sphere is round in every direction."),
          c("Position and direction", "Use left, right, above, below and between.", "Direction words explain where to move; position words explain where something is.", "Move a character one instruction at a time on a small grid.", { type: "grid", item: "🐰", target: "🥕" }, "The carrot is right of the rabbit. Which way should the rabbit move?", ["Face the grid.", "Move one place to the right."], "The star is above the box. Where is the box?", ["Above the star", "Below the star", "Inside the star"], "Below the star", "Reverse the position relationship."),
          c("Make pictures from shapes", "Combine simple shapes to create new pictures.", "Complex pictures can be broken into familiar shapes.", "Look for circles, triangles, squares and rectangles inside an object.", { type: "shape-picture" }, "A simple house can use a square and which roof shape?", ["Use a square for the walls.", "Use a triangle for the roof."], "Which two shapes can make a simple ice-cream picture?", ["Triangle and circle", "Two rectangles", "Square and cube"], "Triangle and circle", "Think of a cone and one round scoop."),
        ]),
        topic("Measurement, Time & Money", "⏰", "Use maths in everyday routines", [
          c("Compare and measure length", "Measure using equal units with no gaps.", "A measurement tells how many equal units fit along an object.", "Place blocks end to end without overlaps or spaces.", { type: "units", count: 6 }, "A pencil is 5 cubes long. What is its length?", ["Each cube is one unit.", "Count all five equal cubes.", "The length is 5 cubes."], "A ribbon covers 8 equal blocks. How long is it?", ["6 units", "7 units", "8 units"], "8 units", "Count every block from the starting edge."),
          c("Compare weight and capacity", "Use heavier, lighter, holds more and holds less.", "Weight tells how heavy; capacity tells how much a container can hold.", "Use a balance for weight and pour equal cups for capacity.", { type: "capacity", values: ["🥛", "🪣"] }, "Which usually holds more: a cup or a bucket?", ["Imagine filling both with the same small cup.", "The bucket needs more cups."], "Which word describes a nearly empty bottle?", ["Full", "Less", "Heavy"], "Less", "Think about how much liquid is inside."),
          c("Read o’clock time", "Read the hour hand when the minute hand points to 12.", "At an o’clock time, the long minute hand points to 12 and the short hour hand shows the hour.", "Move cardboard clock hands and say each time aloud.", { type: "clock", hour: 4 }, "The short hand points to 7 and the long hand to 12. What time is it?", ["The minute hand at 12 means o’clock.", "The hour hand at 7 means seven.", "It is 7 o’clock."], "Which time is shown when the hour hand points to 3?", ["2 o’clock", "3 o’clock", "12 o’clock"], "3 o’clock", "Read the short hour hand."),
          c("Days and calendar", "Use yesterday, today, tomorrow and days of the week.", "Days follow a repeating weekly order.", "Place day cards in order and move one step forward or backward.", { type: "days", active: "Wednesday" }, "What comes after Monday?", ["Say the week from Monday.", "The next day is Tuesday."], "If today is Friday, tomorrow is...", ["Thursday", "Saturday", "Sunday"], "Saturday", "Move one day forward."),
          c("Add money", "Combine common rupee coins and notes.", "Money values add just like numbers. Always use the printed value.", "Choose different coins that make the same total.", { type: "coins", values: [1, 2, 5, 10] }, "How can you make ₹7 using ₹5 and ₹2?", ["Start with ₹5.", "Add ₹2.", "₹5 + ₹2 = ₹7."], "What is ₹10 + ₹5?", ["₹12", "₹15", "₹20"], "₹15", "Add the printed values ten and five."),
        ]),
        topic("Patterns & Data", "📊", "Find rules and read simple information", [
          c("Repeating patterns", "Identify the repeating unit.", "A repeating pattern follows the same small rule again and again.", "Circle one complete repeat, then copy it.", { type: "pattern", values: ["🔴", "🔵", "🔵", "🔴", "🔵", "🔵", "?"] }, "Continue: A, B, A, B, ...", ["The repeating unit is A, B.", "After B comes A."], "What comes next: 2, 4, 2, 4, ...?", ["2", "4", "6"], "2", "Repeat the first number in the pair."),
          c("Growing patterns", "Notice how a pattern changes each time.", "A growing pattern adds the same amount or follows another clear rule.", "Build each stage using blocks and compare it with the previous stage.", { type: "growing", values: [1, 2, 3, 4] }, "Continue: 2, 4, 6, ...", ["The pattern adds 2.", "Six plus two is eight."], "What comes next: 5, 10, 15, ...?", ["16", "20", "25"], "20", "Add five to the last number."),
          c("Sort information", "Organise objects into categories before counting.", "Sorting makes information easier to compare.", "Give every object one category and check that none are counted twice.", { type: "sort", values: ["🍎", "🍌", "🍎", "🍇", "🍎", "🍌"] }, "Sort 3 red balls and 2 blue balls. Which group has more?", ["Make one red group and one blue group.", "Compare 3 with 2.", "Red has more."], "Which category has the most: 4 cats, 2 dogs, 3 birds?", ["Cats", "Dogs", "Birds"], "Cats", "Compare the three counts."),
          c("Read a picture graph", "Use pictures to answer questions about data.", "A picture graph groups information. First check what each picture represents.", "Count the symbols in each row and compare the totals.", { type: "chart", rows: [["Apples", 4], ["Bananas", 2], ["Grapes", 3]] }, "Which fruit has the least votes?", ["Apples have 4.", "Bananas have 2.", "Grapes have 3.", "Two is least, so bananas."], "How many more apple votes than banana votes?", ["1", "2", "3"], "2", "Subtract banana votes from apple votes: 4 − 2."),
        ]),
      ],
    },
  };

  const q = (title, explain, visual, exampleQuestion, steps, checkQuestion, options, answer, hint) =>
    c(title, `Understand ${title.toLowerCase()} with a clear visual model.`, explain, `Draw or build the quantities yourself, then describe what changes in each step.`, visual, exampleQuestion, steps, checkQuestion, options, answer, hint);

  Object.assign(curriculum, {
    "2": { label: "Grade 2", topics: [
      topic("Numbers to 1,000", "🔢", "Place value, comparison and number patterns", [
        q("Hundreds, tens and ones", "A three-digit number is built from hundreds, tens and ones. In 347, 3 means 300, 4 means 40 and 7 means 7.", {type:"placevalue",tens:4,ones:7}, "Expand 526.", ["5 hundreds = 500.","2 tens = 20.","6 ones = 6.","526 = 500 + 20 + 6."], "What is the value of 8 in 482?", ["8","80","800"], "80", "The 8 is in the tens place."),
        q("Compare three-digit numbers", "Compare hundreds first. If they match, compare tens, then ones.", {type:"compare-numbers",left:542,right:519}, "Which is greater: 638 or 683?", ["Both have 6 hundreds.","Compare 3 tens and 8 tens.","683 is greater."], "Choose the sign: 725 __ 752", [">","<","="], "<", "Hundreds match, so compare the tens."),
        q("Skip count and number patterns", "A number pattern follows a rule. Find what is added or removed at every step.", {type:"numberline",values:[100,150,200,250,300],active:100,jump:50}, "Continue 120, 220, 320, ...", ["The rule adds 100.","320 + 100 = 420."], "What comes next: 45, 50, 55, ...?", ["56","60","65"], "60", "The pattern adds five each time."),
      ]),
      topic("Addition & Subtraction", "➕", "Regroup and solve meaningful problems", [
        q("Add with regrouping", "When ones total ten or more, exchange ten ones for one new ten.", {type:"column",top:38,bottom:27,operation:"+",answer:65}, "Find 46 + 28.", ["Ones: 6 + 8 = 14.","Write 4 ones and carry 1 ten.","Tens: 4 + 2 + 1 = 7.","Answer: 74."], "What is 57 + 26?", ["73","83","93"], "83", "Regroup thirteen ones as one ten and three ones."),
        q("Subtract with regrouping", "If there are not enough ones, exchange one ten for ten ones before subtracting.", {type:"column",top:52,bottom:28,operation:"−",answer:24}, "Find 63 − 27.", ["Exchange one ten: 63 becomes 5 tens and 13 ones.","13 − 7 = 6.","5 − 2 = 3.","Answer: 36."], "What is 71 − 46?", ["25","35","45"], "25", "Exchange one ten so eleven ones can subtract six."),
        q("Two-step word problems", "Some stories need two operations. Solve what happens first, then use that result in the next step.", {type:"story",values:["25 birds","+ 18 arrive","− 9 leave"]}, "There are 25 birds. 18 arrive and 9 leave. How many remain?", ["First add: 25 + 18 = 43.","Then subtract: 43 − 9 = 34."], "Ria has 30 stickers, gets 12 and gives 5. How many remain?", ["37","42","47"], "37", "Add the stickers received before subtracting those given away."),
      ]),
      topic("Multiplication & Division", "✖️", "Equal groups, arrays and sharing", [
        q("Equal groups", "Multiplication is a quick way to add equal groups.", {type:"objects",groups:[3,3,3,3],item:"●",equation:"4 groups of 3 = 12"}, "Find 3 groups of 4.", ["Each group has 4.","Add 4 + 4 + 4.","The total is 12."], "What is 5 groups of 2?", ["7","10","12"], "10", "Add two five times."),
        q("Arrays", "An array arranges equal groups in rows and columns. It lets us see multiplication clearly.", {type:"objects",groups:[4,4,4],item:"■",equation:"3 × 4 = 12"}, "An array has 2 rows of 5. How many dots?", ["Each row has 5.","5 + 5 = 10."], "Four rows of 3 make...", ["7","12","16"], "12", "Add three four times."),
        q("Share equally", "Division means sharing a total into equal groups so every group receives the same amount.", {type:"parts",whole:12,part:4}, "Share 12 sweets among 3 children.", ["Give one sweet to each child repeatedly.","Each child receives 4.","12 ÷ 3 = 4."], "10 pencils shared between 2 children gives each...", ["2","5","8"], "5", "Make two equal groups from ten."),
      ]),
      topic("Shapes & Measurement", "📐", "Geometry, length, weight and capacity", [
        q("Sides, vertices and symmetry", "Sides are straight edges and vertices are corners. A line of symmetry divides a shape into matching halves.", {type:"shapes",shapes:["triangle","square","rectangle","circle"]}, "How many vertices does a square have?", ["Trace each corner.","A square has 4 vertices."], "Which shape has 3 sides?", ["Circle","Triangle","Square"], "Triangle", "Count the straight edges."),
        q("Measure in centimetres", "Start at zero on the ruler and read the mark where the object ends.", {type:"units",count:7}, "A pencil starts at 0 and ends at 9 cm. How long is it?", ["The starting mark is zero.","The ending mark is nine.","Length is 9 cm."], "An eraser reaches from 0 to 4 cm. Its length is...", ["3 cm","4 cm","5 cm"], "4 cm", "Read the ending mark when the object starts at zero."),
        q("Weight and capacity", "Grams and kilograms measure weight. Litres and millilitres measure how much liquid a container holds.", {type:"capacity",values:["🥛","🪣"]}, "Which unit suits a school bag: grams or kilograms?", ["A bag is much heavier than a paper clip.","Kilograms are suitable."], "Which unit suits a bucket of water?", ["litres","centimetres","hours"], "litres", "Capacity of liquid is measured in litres."),
      ]),
      topic("Time, Money & Data", "⏰", "Read daily information and solve practical problems", [
        q("Half past and quarter hours", "Half past means 30 minutes after the hour. Quarter past means 15 minutes after.", {type:"clock",hour:3}, "What is half past 4?", ["Half an hour is 30 minutes.","The time is 4:30."], "Quarter past 7 is...", ["7:15","7:30","7:45"], "7:15", "A quarter of an hour is fifteen minutes."),
        q("Add and subtract money", "Add rupees and paise by keeping the units in their correct places.", {type:"coins",values:[1,2,5,10]}, "A book costs ₹35 and a pencil ₹8. Find the total.", ["Add 35 + 8.","The total is ₹43."], "You pay ₹50 for a ₹32 toy. What change?", ["₹16","₹18","₹22"], "₹18", "Subtract the cost from the amount paid."),
        q("Read tables and picture graphs", "Read labels first, then use the values to compare categories and find totals or differences.", {type:"chart",rows:[["Red",5],["Blue",3],["Green",4]]}, "Which colour has the most votes?", ["Compare 5, 3 and 4.","Five is greatest, so red."], "How many more red votes than blue?", ["1","2","3"], "2", "Find the difference between five and three."),
      ]),
    ]},
    "3": { label: "Grade 3", topics: [
      topic("Place Value & Operations", "🔢", "Numbers to 10,000 and efficient calculation", [
        q("Place value to 10,000", "Each place is ten times the place to its right: ones, tens, hundreds and thousands.", {type:"compare-numbers",left:4265,right:4256}, "Expand 3,482.", ["3 thousands = 3,000.","4 hundreds = 400.","8 tens = 80.","2 ones = 2."], "Value of 7 in 7,351?", ["7","70","7,000"], "7,000", "Seven is in the thousands place."),
        q("Round to nearest 10 and 100", "Look at the digit to the right. Five or more rounds up; four or less rounds down.", {type:"numberline",values:[300,350,400,450,500],active:450}, "Round 367 to the nearest 100.", ["367 lies between 300 and 400.","It is past 350.","Round to 400."], "Round 243 to nearest 10.", ["240","250","200"], "240", "The ones digit is three, so round down."),
        q("Add and subtract four-digit numbers", "Align place values and regroup only when a column needs it.", {type:"column",top:2468,bottom:1357,operation:"+",answer:3825}, "Find 3,245 − 1,122.", ["Ones: 5 − 2 = 3.","Tens: 4 − 2 = 2.","Hundreds: 2 − 1 = 1.","Thousands: 3 − 1 = 2."], "What is 2,350 + 1,240?", ["3,490","3,590","3,690"], "3,590", "Add matching place-value columns."),
      ]),
      topic("Multiplication & Division", "✖️", "Facts, strategies and remainders", [
        q("Multiplication facts", "Use known patterns, equal groups and skip counting to build facts instead of memorising blindly.", {type:"objects",groups:[6,6,6,6],item:"●",equation:"4 × 6 = 24"}, "Find 7 × 5.", ["Count by five seven times.","5, 10, 15, 20, 25, 30, 35."], "What is 8 × 4?", ["28","32","36"], "32", "Double eight to sixteen, then double again."),
        q("Multiply by one digit", "Split a larger number into tens and ones, multiply both parts and combine.", {type:"story",values:["23 × 4","20 × 4 = 80","3 × 4 = 12","80 + 12 = 92"]}, "Find 32 × 3.", ["30 × 3 = 90.","2 × 3 = 6.","90 + 6 = 96."], "What is 21 × 4?", ["64","84","104"], "84", "Multiply twenty and one separately."),
        q("Division with remainder", "Sometimes equal sharing leaves a smaller amount that cannot make another complete group. That is the remainder.", {type:"parts",whole:14,part:4}, "Divide 14 into groups of 4.", ["Three groups use 12.","Two remain.","14 ÷ 4 = 3 remainder 2."], "17 ÷ 5 equals...", ["3 R2","4 R1","2 R3"], "3 R2", "Three groups of five use fifteen, leaving two."),
      ]),
      topic("Fractions", "🍕", "Equal parts and fractions of groups", [
        q("Unit fractions", "A unit fraction has one equal part selected. Its denominator tells the total number of equal parts.", {type:"parts",whole:4,part:1}, "What is one part of a shape split into 6 equal parts?", ["One part is selected.","There are six equal parts.","The fraction is one-sixth."], "One part out of eight is...", ["1/6","1/8","8/1"], "1/8", "One selected part goes on top; total parts go below."),
        q("Compare simple fractions", "When denominators match, the fraction with more selected parts is greater.", {type:"compare-numbers",left:3,right:1}, "Compare 3/8 and 5/8.", ["Both have eighths.","Compare numerators 3 and 5.","5/8 is greater."], "Which is greater?", ["2/6","5/6","They are equal"], "5/6", "The pieces are equal-sized, so compare how many are selected."),
        q("Fraction of a group", "To find a fraction of a group, divide into equal groups and take the required number of groups.", {type:"objects",groups:[4,4],item:"●",equation:"1/2 of 8 = 4"}, "Find one-third of 12.", ["Split 12 into 3 equal groups.","Each group has 4.","One-third of 12 is 4."], "One-fourth of 20 is...", ["4","5","8"], "5", "Divide twenty into four equal groups."),
      ]),
      topic("Geometry & Measurement", "📐", "Perimeter, area, mass, length and volume", [
        q("Perimeter", "Perimeter is the total distance around a shape. Add every outside side once.", {type:"shape-picture"}, "A rectangle has sides 5 cm and 3 cm. Find perimeter.", ["Add 5 + 3 + 5 + 3.","The perimeter is 16 cm."], "A square has side 4 cm. Its perimeter is...", ["8 cm","12 cm","16 cm"], "16 cm", "A square has four equal sides."),
        q("Area with square units", "Area measures the surface covered inside a shape. Count equal square units without gaps.", {type:"growing",values:[3,3,3]}, "A rectangle has 3 rows of 4 squares. Find area.", ["Each row has 4 squares.","3 × 4 = 12 square units."], "Area of 5 rows of 2 squares?", ["7","10","12"], "10", "Multiply rows by squares in each row."),
        q("Convert simple measurements", "The same length can be written using different units. One metre equals 100 centimetres.", {type:"measure",left:100,right:150}, "Convert 3 m to cm.", ["One metre is 100 cm.","3 × 100 = 300 cm."], "2 kg equals...", ["200 g","2,000 g","20 g"], "2,000 g", "One kilogram equals one thousand grams."),
      ]),
      topic("Time, Money & Data", "📊", "Elapsed time, transactions and charts", [
        q("Elapsed time", "Elapsed time is how long an event lasts. Count forward from start time to end time.", {type:"clock",hour:2}, "A class starts at 2:00 and ends at 3:30. How long?", ["2:00 to 3:00 is 1 hour.","3:00 to 3:30 is 30 minutes.","Total: 1 hour 30 minutes."], "From 5:15 to 6:00 is...", ["35 min","45 min","60 min"], "45 min", "Count from quarter past five to six o’clock."),
        q("Money word problems", "Keep rupees and paise aligned, then choose addition for total or subtraction for change.", {type:"coins",values:[2,5,10]}, "You buy items for ₹45 and ₹28. Find total.", ["Add 45 + 28.","The total is ₹73."], "Change from ₹100 after spending ₹64?", ["₹26","₹36","₹46"], "₹36", "Subtract sixty-four from one hundred."),
        q("Bar graphs", "A bar’s length or height shows its value. Read the scale before comparing bars.", {type:"chart",rows:[["A",6],["B",4],["C",7]]}, "Which bar has value 7?", ["Read each bar against the scale.","Bar C reaches 7."], "How much greater is A than B?", ["1","2","3"], "2", "Subtract four from six."),
      ]),
    ]},
    "4": { label: "Grade 4", topics: [
      topic("Large Numbers & Operations", "🔢", "Place value, estimation and multi-step calculation", [
        q("Numbers to 100,000", "Read large numbers by grouping places into ones, tens, hundreds, thousands and ten-thousands.", {type:"compare-numbers",left:54320,right:53420}, "Expand 48,205.", ["4 ten-thousands = 40,000.","8 thousands = 8,000.","2 hundreds = 200.","5 ones = 5."], "Value of 6 in 67,124?", ["600","6,000","60,000"], "60,000", "Six is in the ten-thousands place."),
        q("Estimate sums and differences", "Round numbers to friendly values before calculating to check whether an exact answer is reasonable.", {type:"numberline",values:[2000,3000,4000,5000,6000],active:4000}, "Estimate 3,892 + 2,104 to nearest thousand.", ["3,892 rounds to 4,000.","2,104 rounds to 2,000.","Estimate: 6,000."], "Estimate 7,820 − 3,170.", ["4,000","5,000","6,000"], "5,000", "Round to eight thousand and three thousand."),
        q("Multi-step operations", "Use brackets or story order to decide which calculation comes first, and check each result.", {type:"story",values:["1,250 + 875","− 460","= 1,665"]}, "A shop had 1,250 books, received 875 and sold 460. How many remain?", ["Add stock: 1,250 + 875 = 2,125.","Subtract sold: 2,125 − 460 = 1,665."], "500 + 240 − 175 equals...", ["565","575","765"], "565", "Add first, then subtract."),
      ]),
      topic("Multiplication & Division", "✖️", "Larger products, quotients and problem solving", [
        q("Multiply by two digits", "Break the second factor into tens and ones, find two partial products and add them.", {type:"column",top:24,bottom:13,operation:"×",answer:312}, "Find 32 × 15.", ["32 × 5 = 160.","32 × 10 = 320.","160 + 320 = 480."], "What is 21 × 14?", ["284","294","304"], "294", "Multiply by four and by ten, then add."),
        q("Long division", "Division separates a large amount into equal groups. Divide, multiply, subtract and bring down in order.", {type:"parts",whole:156,part:12}, "Find 156 ÷ 12.", ["12 fits into 15 once; remainder 3.","Bring down 6 to make 36.","12 fits into 36 three times.","Answer: 13."], "144 ÷ 12 equals...", ["11","12","14"], "12", "Ask which multiplication fact gives 144."),
        q("Factors and multiples", "Factors divide a number exactly. Multiples are found by multiplying the number by whole numbers.", {type:"visual-words",values:["1","2","3","6"]}, "List factors of 12.", ["Test numbers that divide 12 with no remainder.","1, 2, 3, 4, 6 and 12 are factors."], "Which is a multiple of 7?", ["24","28","32"], "28", "Seven times four is twenty-eight."),
      ]),
      topic("Fractions & Decimals", "🍕", "Equivalent fractions and decimal place value", [
        q("Equivalent fractions", "Equivalent fractions name the same amount using different numbers of equal pieces.", {type:"story",values:["1/2","=","2/4","=","4/8"]}, "Make 3/5 equivalent with denominator 10.", ["Multiply denominator 5 by 2.","Multiply numerator 3 by 2.","3/5 = 6/10."], "Which equals 1/2?", ["2/3","3/6","4/6"], "3/6", "Multiply top and bottom by the same number."),
        q("Add and subtract like fractions", "When denominators match, the pieces are the same size. Add or subtract numerators and keep the denominator.", {type:"story",values:["2/8","+ 3/8","= 5/8"]}, "Find 4/9 + 2/9.", ["Keep denominator 9.","Add numerators 4 + 2 = 6.","Answer: 6/9."], "What is 7/10 − 3/10?", ["4/10","4/7","10/10"], "4/10", "Subtract the top numbers only."),
        q("Tenths and hundredths", "The first digit after the decimal is tenths; the second is hundredths.", {type:"placevalue",tens:0,ones:7}, "Write 6 tenths as a decimal.", ["Tenths occupy the first decimal place.","Six tenths is 0.6."], "What is 35 hundredths?", ["0.35","3.5","35.0"], "0.35", "Hundredths need two decimal places."),
      ]),
      topic("Geometry & Measurement", "📐", "Angles, symmetry, perimeter, area and units", [
        q("Types of angles", "An acute angle is smaller than a right angle; an obtuse angle is larger but less than a straight angle.", {type:"visual-words",values:["acute","right","obtuse"]}, "Classify a 90-degree angle.", ["A square corner measures 90 degrees.","It is a right angle."], "An angle smaller than 90 degrees is...", ["acute","right","obtuse"], "acute", "Compare it with a square corner."),
        q("Lines and symmetry", "Parallel lines never meet. Perpendicular lines meet at a right angle. Symmetry creates matching halves.", {type:"pattern",values:["∥","⊥","◇"]}, "Which symbol shows perpendicular lines?", ["Perpendicular lines make a square corner.","The symbol is ⊥."], "Parallel lines...", ["always meet","never meet","make a circle"], "never meet", "Think of railway tracks."),
        q("Area and perimeter", "Perimeter measures the boundary; area measures the surface inside. They answer different questions.", {type:"shape-picture"}, "Rectangle length 8 cm, width 3 cm. Find area.", ["Area = length × width.","8 × 3 = 24.","Area is 24 cm²."], "Perimeter of a 5 cm square?", ["10 cm","20 cm","25 cm²"], "20 cm", "Add all four equal sides."),
      ]),
      topic("Data, Time & Money", "📊", "Interpret information and everyday calculations", [
        q("Line plots and bar graphs", "Use the title, labels and scale before drawing conclusions from a graph.", {type:"chart",rows:[["Mon",4],["Tue",7],["Wed",5]]}, "On which day is the value greatest?", ["Compare bar lengths.","Tuesday reaches 7, the greatest."], "Difference between Tuesday and Monday?", ["2","3","4"], "3", "Subtract four from seven."),
        q("Time intervals", "Convert hours to minutes when needed, then count the duration in manageable jumps.", {type:"clock",hour:9}, "From 9:35 to 11:05, how long?", ["9:35 to 10:35 is 1 hour.","10:35 to 11:05 is 30 minutes.","Total: 1 hour 30 minutes."], "From 2:20 to 3:00 is...", ["30 min","40 min","50 min"], "40 min", "Count twenty-to-sixty minutes."),
        q("Bills and change", "Add item prices for the bill and subtract the bill from the amount paid to find change.", {type:"coins",values:[5,10,20]}, "Items cost ₹68 and ₹47. Find total.", ["Add 68 + 47.","The bill is ₹115."], "Change from ₹200 after a ₹138 bill?", ["₹52","₹62","₹72"], "₹62", "Subtract 138 from 200."),
      ]),
    ]},
    "5": { label: "Grade 5", topics: [
      topic("Large Numbers & Operations", "🔢", "Place value, Roman numerals and calculation", [
        q("Numbers to one million", "Read large numbers in place-value periods and use commas to separate groups clearly.", {type:"compare-numbers",left:654321,right:645321}, "Expand 507,284.", ["5 hundred-thousands = 500,000.","7 thousands = 7,000.","2 hundreds = 200.","8 tens = 80 and 4 ones."], "Value of 9 in 492,150?", ["900","9,000","90,000"], "90,000", "Nine is in the ten-thousands place."),
        q("Order of operations", "Brackets come first, then multiplication or division, then addition or subtraction from left to right.", {type:"story",values:["6 + 4 × 3","4 × 3 = 12","6 + 12 = 18"]}, "Find 20 − 3 × 4.", ["Multiply first: 3 × 4 = 12.","Then subtract: 20 − 12 = 8."], "What is 5 + 2 × 6?", ["42","17","60"], "17", "Complete multiplication before addition."),
        q("Roman numerals", "Roman numerals combine symbols such as I, V, X, L and C. A smaller symbol before a larger one means subtract.", {type:"visual-words",values:["I = 1","V = 5","X = 10","L = 50"]}, "Write 24 in Roman numerals.", ["20 is XX.","4 is IV.","24 is XXIV."], "What number is XL?", ["40","50","60"], "40", "X before L means fifty minus ten."),
      ]),
      topic("Factors, Multiples & Patterns", "🧩", "Prime numbers, divisibility, HCF and LCM", [
        q("Prime and composite numbers", "A prime number has exactly two factors: one and itself. A composite number has more than two factors.", {type:"visual-words",values:["2","3","5","7","11"]}, "Is 13 prime?", ["Its only factors are 1 and 13.","So 13 is prime."], "Which number is composite?", ["7","11","12"], "12", "Twelve has factors other than one and itself."),
        q("Divisibility rules", "Quick rules tell whether a number divides exactly. Even numbers divide by 2; digit sum helps test 3 and 9.", {type:"pattern",values:["246","→","2+4+6=12","→","÷3"]}, "Is 357 divisible by 3?", ["Add digits: 3 + 5 + 7 = 15.","Fifteen divides by 3.","Yes."], "Which is divisible by 5?", ["234","275","328"], "275", "Numbers divisible by five end in zero or five."),
        q("HCF and LCM", "HCF is the greatest shared factor. LCM is the smallest positive multiple shared by both numbers.", {type:"story",values:["Factors of 8: 1,2,4,8","Factors of 12: 1,2,3,4,6,12","HCF = 4"]}, "Find HCF of 18 and 24.", ["Shared factors include 1, 2, 3 and 6.","The greatest is 6."], "LCM of 4 and 6?", ["10","12","24"], "12", "List multiples until the first shared one."),
      ]),
      topic("Fractions", "🍕", "Unlike denominators, mixed numbers and fraction operations", [
        q("Add unlike fractions", "Fractions need equal-sized pieces before adding. Find a common denominator, rename each fraction, then add.", {type:"story",values:["1/2","+ 1/4","= 2/4 + 1/4","= 3/4"]}, "Find 1/3 + 1/6.", ["Common denominator is 6.","1/3 = 2/6.","2/6 + 1/6 = 3/6 = 1/2."], "What is 1/2 + 1/5?", ["2/7","7/10","3/5"], "7/10", "Use common denominator ten."),
        q("Mixed and improper fractions", "A mixed number has a whole and a fraction. An improper fraction has a numerator at least as large as its denominator.", {type:"story",values:["1 3/4","=","7/4"]}, "Convert 2 1/3 to an improper fraction.", ["2 wholes contain 6 thirds.","Add 1 third.","Answer: 7/3."], "Convert 9/4 to a mixed number.", ["2 1/4","2 2/4","3 1/4"], "2 1/4", "Four fits into nine twice with one remaining."),
        q("Fraction of a quantity", "Multiply the quantity by the numerator and divide by the denominator, or divide first when it is easier.", {type:"objects",groups:[6,6,6,6],item:"●",equation:"3/4 of 24 = 18"}, "Find 2/5 of 30.", ["30 ÷ 5 = 6.","6 × 2 = 12."], "What is 3/8 of 40?", ["12","15","18"], "15", "Divide forty by eight, then multiply by three."),
      ]),
      topic("Decimals & Percent", "🔟", "Decimal operations and percentage meaning", [
        q("Decimal place value", "Digits after the decimal represent tenths, hundredths and thousandths. Place determines value.", {type:"story",values:["4.372","3 tenths","7 hundredths","2 thousandths"]}, "What is the value of 6 in 2.064?", ["The 6 is in the hundredths place.","Its value is 0.06."], "Which digit is in tenths place in 8.45?", ["8","4","5"], "4", "Tenths is the first place after the decimal."),
        q("Add and subtract decimals", "Line up decimal points so equal place values stay in the same column. Add zeros if helpful.", {type:"column",top:12.5,bottom:3.75,operation:"+",answer:16.25}, "Find 8.4 − 2.65.", ["Write 8.40 − 2.65.","Subtract aligned columns.","Answer: 5.75."], "What is 4.8 + 1.35?", ["5.15","6.15","6.85"], "6.15", "Align decimal points before adding."),
        q("Percent means out of 100", "A percent is a fraction with denominator 100. Fifty percent means fifty out of one hundred, or one-half.", {type:"tenframe",filled:5,extras:0,equation:"50% = 1/2"}, "Write 25% as a fraction in simplest form.", ["25% = 25/100.","Divide top and bottom by 25.","Answer: 1/4."], "What is 10% of 200?", ["10","20","40"], "20", "Ten percent is one-tenth; divide by ten."),
      ]),
      topic("Geometry, Measurement & Data", "📊", "Volume, coordinates, units and information", [
        q("Volume of cuboids", "Volume counts cubic units filling a solid. Multiply length, width and height.", {type:"story",values:["length 4","width 3","height 2","volume 24"]}, "Cuboid 5 × 2 × 3. Find volume.", ["Multiply 5 × 2 = 10.","Then 10 × 3 = 30.","Volume is 30 cubic units."], "Volume of 4 × 4 × 2?", ["16","24","32"], "32", "Multiply all three dimensions."),
        q("Coordinate grids", "An ordered pair is written x first, then y. Move across the horizontal axis before moving up the vertical axis.", {type:"grid",item:"(0,0)",target:"(3,2)"}, "Plot (4, 1).", ["Move four places right on x.","Move one place up on y."], "Which coordinate is 2 right and 5 up?", ["(5,2)","(2,5)","(2,3)"], "(2,5)", "Write horizontal movement first."),
        q("Convert metric units", "Metric units change by factors of ten, hundred or thousand. Use place value rather than guessing.", {type:"measure",left:100,right:150}, "Convert 2.5 m to cm.", ["One metre is 100 cm.","2.5 × 100 = 250 cm."], "3,500 m equals...", ["3.5 km","35 km","350 km"], "3.5 km", "One kilometre is one thousand metres."),
        q("Average and data interpretation", "The mean average shares the total equally: add all values, then divide by how many values there are.", {type:"chart",rows:[["A",4],["B",6],["C",8]]}, "Find mean of 4, 6 and 8.", ["Add: 4 + 6 + 8 = 18.","There are 3 values.","18 ÷ 3 = 6."], "Mean of 5, 7, 9 and 11?", ["7","8","9"], "8", "Add all four values and divide by four."),
      ]),
    ]},
  });

  const hindiAudio = {
    "Count objects to 10": "गिनती हमें बताती है कि समूह में कुल कितनी चीज़ें हैं। हर चीज़ को एक बार छुएँ और एक संख्या बोलें। आख़िरी बोली गई संख्या ही कुल संख्या है।",
    "Read numbers 1–10": "अंक किसी मात्रा को जल्दी दिखाने का चिन्ह है। पहले बिंदुओं को गिनें, फिर उसी मात्रा वाले अंक से मिलाएँ।",
    "Count from 11–20": "ग्यारह से बीस तक हर संख्या में एक पूरा दस और कुछ इकाइयाँ होती हैं। जैसे चौदह में एक दस और चार इकाइयाँ हैं।",
    "Before, after and between": "संख्याएँ क्रम में रहती हैं। किसी संख्या से एक कम उसके पहले और एक अधिक उसके बाद आता है। संख्या रेखा पर बाएँ और दाएँ देखकर पड़ोसी खोजें।",
    "More, fewer and equal": "जिस समूह में ज़्यादा चीज़ें हों वह अधिक है। दोनों समूहों की चीज़ों की जोड़ी बनाएँ। जो समूह पहले समाप्त हो जाए उसमें कम चीज़ें हैं।",
    "Addition means together": "जोड़ का मतलब दो समूहों को मिलाकर कुल संख्या निकालना है। दोनों समूह साथ रखें और सभी चीज़ों को एक बार गिनें।",
    "Add within 5": "पहली संख्या मन में रखें और दूसरी संख्या जितना आगे गिनें। दो और तीन जोड़ने के लिए दो से आगे तीन कदम गिनें।",
    "Add within 10": "जोड़ते समय बड़ी संख्या से शुरू करके आगे बढ़ना आसान होता है। हर आगे का कदम कुल में एक जोड़ता है।",
    "Make 10": "दस को कई जोड़ियों में बाँटा जा सकता है, जैसे एक और नौ, दो और आठ, तीन और सात। टेन फ्रेम की खाली जगहें दस का साथी बताती हैं।",
    "Subtraction means take away": "घटाव का मतलब समूह में से कुछ चीज़ें हटाना है। हटाने के बाद जो चीज़ें बचें, उन्हें गिनकर उत्तर पाएँ।",
    "Subtract within 5": "पाँच या उससे कम चीज़ें दिखाएँ, जितनी घटानी हैं उन्हें काटें या दूर करें, फिर बची चीज़ें गिनें।",
    "Subtract within 10": "घटाव में संख्या रेखा पर पीछे चलते हैं। पहली संख्या से शुरू करें और जितना घटाना है उतने कदम पीछे जाएँ।",
    "Find the missing part": "पूरी संख्या दो हिस्सों से बन सकती है। पूरी संख्या और एक हिस्सा पता हो तो घटाव से छिपा हुआ हिस्सा मिलता है।",
    "Circle, square, triangle, rectangle": "आकार को उसके रंग या आकार से नहीं, उसकी भुजाओं और कोनों से पहचानते हैं। किनारे पर उँगली चलाकर भुजाएँ और कोने गिनें।",
    "Sort shapes": "छँटाई का मतलब एक साफ़ नियम के अनुसार समूह बनाना है। हम आकार, रंग, माप या भुजाओं की संख्या के अनुसार छाँट सकते हैं।",
    "Inside, outside, above and below": "स्थिति वाले शब्द बताते हैं कि कोई चीज़ कहाँ है। अंदर, बाहर, ऊपर और नीचे को खिलौना रखकर बोलकर देखें।",
    "Continue a shape pattern": "पैटर्न में एक छोटा क्रम बार-बार दोहरता है। पहले दोहरने वाला छोटा भाग खोजें, फिर उसी क्रम से अगला आकार चुनें।",
    "Long and short": "लंबाई की सही तुलना के लिए दोनों चीज़ों को एक ही शुरुआती रेखा से रखें। जो चीज़ आगे तक पहुँचे वह लंबी है।",
    "Heavy and light": "भारी चीज़ तराज़ू को नीचे खींचती है और हल्की चीज़ ऊपर रहती है। सोचें कि किस वस्तु को उठाने में अधिक मेहनत लगेगी।",
    "Morning, afternoon and night": "सुबह दिन की शुरुआत होती है, दोपहर दिन का बीच और रात सोने का समय होती है। रोज़ के कामों को सही समय से मिलाएँ।",
    "Know common coins": "सिक्के की कीमत उस पर लिखी संख्या बताती है। बड़ा दिखने वाला सिक्का हमेशा अधिक कीमत का नहीं होता।",
    "Tens and ones": "दो अंकों की संख्या में पहला अंक दहाइयाँ और दूसरा अंक इकाइयाँ बताता है। चौंतीस में तीन दहाइयाँ और चार इकाइयाँ हैं।",
    "Read and write numbers to 100": "संख्या का नाम पहले दहाइयाँ और फिर इकाइयाँ बताता है। बयालीस का अर्थ चार दहाइयाँ और दो इकाइयाँ है।",
    "Compare numbers": "दो अंकों की तुलना में पहले दहाइयाँ देखें। दहाइयाँ समान हों तो इकाइयों की तुलना करें।",
    "Order numbers": "क्रम लगाने का मतलब संख्याओं को छोटे से बड़े या बड़े से छोटे रखना है। संख्या रेखा पर बाएँ की संख्या छोटी और दाएँ की बड़ी होती है।",
    "Skip count by 2, 5 and 10": "स्किप काउंटिंग में हर बार एक बराबर संख्या जोड़ते हैं। दो-दो गिनने में हर अगली संख्या दो अधिक होती है।",
    "Number bonds to 10": "दस बनाने वाली जोड़ियाँ याद रखने से जोड़ आसान होता है। छह को दस बनाने के लिए चार चाहिए, इसलिए छह और चार दस हैं।",
    "Add a one-digit number to a two-digit number": "दो अंकों की संख्या में छोटी संख्या जोड़ते समय इकाइयों को इकाइयों में जोड़ें और दहाइयों को उसी जगह रखें।",
    "Add two-digit numbers without regrouping": "दो अंकों का जोड़ करते समय इकाई के नीचे इकाई और दहाई के नीचे दहाई रखें। पहले इकाइयाँ, फिर दहाइयाँ जोड़ें।",
    "Addition word problems": "कहानी में कुल, मिलाकर, और सभी जैसे शब्द अक्सर जोड़ बताते हैं। कहानी के दोनों समूह बनाएँ और उन्हें साथ गिनें।",
    "Subtraction facts to 20": "जोड़ और घटाव एक ही फैक्ट फैमिली के सदस्य हैं। यदि आठ और छह चौदह हैं, तो चौदह में से आठ घटाने पर छह बचेगा।",
    "Subtract from a two-digit number": "दो अंकों की संख्या में से इकाइयाँ घटाते समय दहाइयाँ वैसी ही रखें और केवल इकाइयों में से हटाएँ।",
    "Subtract two-digit numbers without regrouping": "इकाई के नीचे इकाई और दहाई के नीचे दहाई लिखें। पहले इकाइयाँ घटाएँ, फिर दहाइयाँ।",
    "Subtraction word problems": "बचे, चले गए, दिए या कितने कम जैसे शब्द घटाव का संकेत दे सकते हैं। पहले पूरी संख्या दिखाएँ, फिर जाने वाली संख्या हटाएँ।",
    "2D shapes": "समतल आकारों को भुजाओं और कोनों से पहचानें। आकार घुमाने, रंग बदलने या बड़ा करने पर भी उसका नाम नहीं बदलता।",
    "3D shapes": "ठोस आकार जगह घेरते हैं और उनकी सतहें होती हैं। गेंद गोले जैसी, पासा घन जैसा और डिब्बा घनाभ जैसा होता है।",
    "Position and direction": "बायाँ, दायाँ, ऊपर, नीचे और बीच स्थिति बताते हैं। निर्देश को एक समय में एक कदम करके पूरा करें।",
    "Make pictures from shapes": "बड़ी तस्वीरें छोटे परिचित आकारों से बनती हैं। घर में दीवार के लिए वर्ग और छत के लिए त्रिभुज देखा जा सकता है।",
    "Compare and measure length": "मापने के लिए बराबर इकाइयाँ बिना खाली जगह और बिना एक-दूसरे पर चढ़ाए लगाएँ। फिर सभी इकाइयाँ गिनें।",
    "Compare weight and capacity": "वज़न बताता है वस्तु कितनी भारी है। क्षमता बताती है किसी बर्तन में कितना आ सकता है। दोनों अलग बातें हैं।",
    "Read o’clock time": "पूरे घंटे पर लंबी मिनट वाली सुई बारह पर होती है और छोटी घंटे वाली सुई समय का घंटा बताती है।",
    "Days and calendar": "सप्ताह के दिन एक निश्चित क्रम में बार-बार आते हैं। कल के लिए एक कदम पीछे और आने वाले कल के लिए एक कदम आगे जाएँ।",
    "Add money": "रुपयों की कीमत भी संख्याओं की तरह जोड़ी जाती है। पाँच रुपये और दो रुपये मिलाकर सात रुपये होते हैं।",
    "Repeating patterns": "दोहरने वाले पैटर्न में एक छोटा समूह उसी क्रम में बार-बार आता है। उस छोटे समूह को पहचानकर आगे बढ़ाएँ।",
    "Growing patterns": "बढ़ते पैटर्न में हर चरण एक साफ़ नियम से बदलता है। पिछले चरण से तुलना करके देखें कि हर बार कितना जुड़ रहा है।",
    "Sort information": "जानकारी को श्रेणियों में बाँटने से तुलना आसान होती है। हर चीज़ को केवल एक सही समूह में रखें और फिर गिनें।",
    "Read a picture graph": "चित्र ग्राफ जानकारी को पंक्तियों में दिखाता है। पहले देखें एक चित्र कितनी मात्रा बताता है, फिर हर पंक्ति के चित्र गिनें।"
  };

  const gradeSelect = lab.querySelector("[data-maths-grade]");
  const topicsEl = lab.querySelector("[data-maths-topics]");
  const conceptSection = lab.querySelector("[data-concept-section]");
  const conceptsEl = lab.querySelector("[data-maths-concepts]");
  const conceptHeading = lab.querySelector("[data-concept-heading]");
  const lesson = lab.querySelector("[data-maths-lesson]");
  const visual = lab.querySelector("[data-maths-visual]");
  const progress = lab.querySelector("[data-maths-progress]");
  const storageKey = "kidsverseMathsLabProgressV1";
  let grade = gradeSelect.value;
  let topicIndex = 0;
  let conceptIndex = 0;
  let exampleStep = 0;
  let alternateShown = false;

  const getSaved = () => { try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; } };
  const saveComplete = (key) => { const saved = getSaved(); saved[key] = true; try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch {} renderProgress(); };
  const allConcepts = () => curriculum[grade].topics.flatMap((item) => item.concepts);
  const currentTopic = () => curriculum[grade].topics[topicIndex];
  const currentConcept = () => currentTopic().concepts[conceptIndex];
  const conceptKey = () => `${grade}:${topicIndex}:${conceptIndex}`;

  function renderVisual(config) {
    const dots = (count, item = "●", crossed = 0) => Array.from({ length: count }, (_, index) => `<span class="${index < crossed ? "is-removed" : ""}">${item}</span>`).join("");
    if (config.type === "objects") return `<div class="visual-groups">${config.groups.map((count) => `<div>${dots(count, config.item)}</div>`).join("<b>+</b>")}</div><strong>${config.equation}</strong>`;
    if (config.type === "takeaway") return `<div class="visual-takeaway">${dots(config.total, config.item, config.remove)}</div><strong>${config.total} − ${config.remove} = ${config.total - config.remove}</strong>`;
    if (config.type === "tenframe") return `<div class="ten-frame">${Array.from({ length: 10 }, (_, i) => `<i class="${i < config.filled ? "is-filled" : ""}"></i>`).join("")}</div>${config.extras ? `<div class="extra-counters">${dots(config.extras)}</div>` : ""}<strong>${config.equation}</strong>`;
    if (config.type === "numberline") return `<div class="visual-numberline">${config.values.map((value) => `<span class="${value === config.active ? "is-active" : ""}">${value}</span>`).join("")}</div>${config.jump ? `<small>${config.jump > 0 ? "Jump forward" : "Jump backward"} ${Math.abs(config.jump)} steps</small>` : ""}`;
    if (config.type === "match") return `<div class="visual-match"><b>${config.number}</b><span>means</span><div>${typeof config.item === "string" && config.item.length > 2 ? config.item : dots(config.number, config.item)}</div></div>`;
    if (config.type === "compare") return `<div class="visual-compare"><div>${dots(config.left, config.item)}</div><b>more than</b><div>${dots(config.right, config.item)}</div></div>`;
    if (config.type === "compare-numbers") return `<div class="visual-big-compare"><b>${config.left}</b><span>&gt;</span><b>${config.right}</b></div>`;
    if (config.type === "placevalue" || config.type.startsWith("placevalue-")) { const ones = config.ones; return `<div class="place-value"><div><span>Tens</span>${Array.from({length:config.tens},()=>"<i></i>").join("")}</div><div><span>Ones</span>${dots(ones)}</div></div>${config.add ? `<strong>Add ${config.add} ones</strong>` : config.remove ? `<strong>Remove ${config.remove} ones</strong>` : `<strong>${config.tens * 10} + ${ones} = ${config.tens * 10 + ones}</strong>`}`; }
    if (config.type === "shapes") return `<div class="visual-shapes">${config.shapes.map((shape) => `<i class="shape-${shape}" title="${shape}"></i>`).join("")}</div>`;
    if (config.type === "solids" || config.type === "visual-words") return `<div class="visual-words">${config.values.map(value => `<span>${value}</span>`).join("")}</div>`;
    if (config.type === "pattern") return `<div class="visual-pattern">${config.values.map(value => `<span>${value}</span>`).join("")}</div>`;
    if (config.type === "sort") return `<div class="visual-sort">${config.values.map(value => `<span>${value}</span>`).join("")}</div><small>What rule could make the groups?</small>`;
    if (config.type === "position") return `<div class="visual-position"><span>${config.place}</span><b>${config.item}</b><small>${config.word}</small></div>`;
    if (config.type === "measure") return `<div class="visual-measure"><i style="width:${config.left}px"></i><i style="width:${config.right}px"></i></div>`;
    if (config.type === "balance") return `<div class="visual-balance"><span>${config.left}</span><i></i><span>${config.right}</span></div>`;
    if (config.type === "day") return `<div class="visual-days">${config.values.map(value => `<span>${value}</span>`).join("→")}</div>`;
    if (config.type === "coins") return `<div class="visual-coins">${config.values.map(value => `<span>₹${value}</span>`).join("")}</div>`;
    if (config.type === "parts") return `<div class="visual-parts"><strong>${config.whole}</strong><span>${config.part}</span><span>?</span></div>`;
    if (config.type === "column") return `<div class="visual-column"><span>${config.top}</span><span>${config.operation} ${config.bottom}</span><i></i><strong>${config.answer}</strong></div>`;
    if (config.type === "story") return `<div class="visual-story">${config.values.map(value => `<span>${value}</span>`).join("")}</div>`;
    if (config.type === "fact-family") return `<div class="visual-parts"><strong>${config.values[2]}</strong><span>${config.values[0]}</span><span>${config.values[1]}</span></div>`;
    if (config.type === "grid") return `<div class="visual-grid"><span>${config.item}</span><i>→</i><span>${config.target}</span></div>`;
    if (config.type === "shape-picture") return `<div class="shape-house"><i></i><b></b><span></span></div>`;
    if (config.type === "units") return `<div class="visual-units"><i></i>${Array.from({length:config.count},(_,i)=>`<span>${i+1}</span>`).join("")}</div>`;
    if (config.type === "capacity") return `<div class="visual-capacity">${config.values.map(value=>`<span>${value}</span>`).join("<b>holds less than</b>")}</div>`;
    if (config.type === "clock") return `<div class="visual-clock"><i style="--hour:${config.hour * 30}deg"></i><b></b><span>12</span><small>${config.hour} o’clock</small></div>`;
    if (config.type === "days") return `<div class="visual-words"><span>Tuesday</span><strong>${config.active}</strong><span>Thursday</span></div>`;
    if (config.type === "growing") return `<div class="visual-growing">${config.values.map(value=>`<span>${"■".repeat(value)}</span>`).join("")}</div>`;
    if (config.type === "chart") return `<div class="visual-chart">${config.rows.map(([name,count])=>`<div><span>${name}</span><i style="--bar:${count * 22}px"></i><b>${count}</b></div>`).join("")}</div>`;
    return `<strong>Let’s explore this idea together.</strong>`;
  }

  function renderTopics() {
    const data = curriculum[grade];
    topicsEl.innerHTML = data.topics.map((item, index) => `<button type="button" data-topic-index="${index}" class="${index === topicIndex ? "is-active" : ""}"><span>${item.icon}</span><strong>${item.title}</strong><small>${item.description}</small><em>${item.concepts.length} concepts →</em></button>`).join("");
    renderProgress();
  }

  function renderConcepts() {
    const selected = currentTopic();
    conceptHeading.textContent = selected.title;
    conceptsEl.innerHTML = selected.concepts.map((item, index) => `<button type="button" data-concept-index="${index}" class="${index === conceptIndex && !lesson.hidden ? "is-active" : ""}"><span>${getSaved()[`${grade}:${topicIndex}:${index}`] ? "✓" : index + 1}</span><strong>${item.title}</strong><small>${item.goal}</small></button>`).join("");
    conceptSection.hidden = false;
  }

  function renderLesson() {
    const selected = currentConcept();
    window.speechSynthesis?.cancel();
    lesson.querySelectorAll("[data-maths-listen]").forEach(button => button.classList.remove("is-speaking"));
    lesson.querySelector("[data-audio-status]").textContent = "Choose a language";
    exampleStep = 0;
    alternateShown = false;
    lesson.querySelector("[data-lesson-path]").textContent = `${curriculum[grade].label} · ${currentTopic().title}`;
    lesson.querySelector("[data-lesson-title]").textContent = selected.title;
    lesson.querySelector("[data-lesson-goal]").textContent = selected.goal;
    lesson.querySelector("[data-explanation-title]").textContent = "What does it mean?";
    lesson.querySelector("[data-explanation-copy]").textContent = selected.explain;
    visual.innerHTML = renderVisual(selected.visual);
    lesson.querySelector("[data-example-question]").textContent = selected.exampleQuestion;
    lesson.querySelector("[data-example-steps]").innerHTML = "<p>Tap “Show first step” and solve it with us.</p>";
    lesson.querySelector("[data-show-step]").textContent = "Show first step";
    lesson.querySelector("[data-show-step]").disabled = false;
    lesson.querySelector("[data-check-question]").textContent = selected.check.question;
    lesson.querySelector("[data-answer-options]").innerHTML = selected.check.options.map(option => `<button type="button" data-maths-answer="${option.replace(/"/g, "&quot;")}">${option}</button>`).join("");
    const feedback = lesson.querySelector("[data-maths-feedback]");
    feedback.hidden = true;
    feedback.className = "maths-feedback";
    lesson.querySelector("[data-previous-concept]").disabled = topicIndex === 0 && conceptIndex === 0;
    lesson.querySelector("[data-next-concept]").textContent = topicIndex === curriculum[grade].topics.length - 1 && conceptIndex === currentTopic().concepts.length - 1 ? "Journey complete ✓" : "Next concept →";
    lesson.hidden = false;
    renderConcepts();
    lesson.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderProgress() {
    const total = allConcepts().length;
    const prefix = `${grade}:`;
    const complete = Object.keys(getSaved()).filter(key => key.startsWith(prefix)).length;
    lab.querySelector("[data-progress-grade]").textContent = `${curriculum[grade].label} Journey`;
    lab.querySelector("[data-progress-count]").textContent = `${complete} of ${total} concepts explored`;
    lab.querySelector("[data-progress-message]").textContent = complete ? "Great progress. Keep building one idea at a time." : "Pick a topic to begin.";
    progress.max = total;
    progress.value = complete;
  }

  function moveConcept(direction) {
    conceptIndex += direction;
    if (conceptIndex >= currentTopic().concepts.length) { if (topicIndex < curriculum[grade].topics.length - 1) { topicIndex += 1; conceptIndex = 0; } else { conceptIndex -= 1; return; } }
    if (conceptIndex < 0) { if (topicIndex > 0) { topicIndex -= 1; conceptIndex = currentTopic().concepts.length - 1; } else { conceptIndex = 0; return; } }
    renderTopics(); renderConcepts(); renderLesson();
  }

  gradeSelect.addEventListener("change", () => { grade = gradeSelect.value; topicIndex = 0; conceptIndex = 0; lesson.hidden = true; conceptSection.hidden = true; renderTopics(); });
  topicsEl.addEventListener("click", event => { const button = event.target.closest("[data-topic-index]"); if (!button) return; topicIndex = Number(button.dataset.topicIndex); conceptIndex = 0; lesson.hidden = true; renderTopics(); renderConcepts(); conceptSection.scrollIntoView({ behavior: "smooth", block: "center" }); });
  conceptsEl.addEventListener("click", event => { const button = event.target.closest("[data-concept-index]"); if (!button) return; conceptIndex = Number(button.dataset.conceptIndex); renderLesson(); });
  lesson.querySelector("[data-other-way]").addEventListener("click", () => { const selected = currentConcept(); alternateShown = !alternateShown; lesson.querySelector("[data-explanation-title]").textContent = alternateShown ? "Try this way instead" : "What does it mean?"; lesson.querySelector("[data-explanation-copy]").textContent = alternateShown ? selected.alternate : selected.explain; });
  lesson.querySelector("[data-show-step]").addEventListener("click", event => { const steps = currentConcept().steps; if (exampleStep < steps.length) exampleStep += 1; lesson.querySelector("[data-example-steps]").innerHTML = steps.slice(0, exampleStep).map((step, index) => `<p><span>${index + 1}</span>${step}</p>`).join(""); event.currentTarget.textContent = exampleStep >= steps.length ? "Example complete ✓" : "Show next step"; event.currentTarget.disabled = exampleStep >= steps.length; });
  lesson.querySelector("[data-answer-options]").addEventListener("click", event => { const button = event.target.closest("[data-maths-answer]"); if (!button) return; const selected = currentConcept(); const correct = button.dataset.mathsAnswer === selected.check.answer; const feedback = lesson.querySelector("[data-maths-feedback]"); lesson.querySelectorAll("[data-maths-answer]").forEach(option => option.classList.remove("is-correct", "is-wrong")); button.classList.add(correct ? "is-correct" : "is-wrong"); feedback.hidden = false; feedback.className = `maths-feedback ${correct ? "is-success" : "is-retry"}`; feedback.innerHTML = correct ? `<span>⭐</span><div><strong>You understood it!</strong><p>${selected.check.answer} is correct. This concept has been added to your progress.</p></div>` : `<span>↻</span><div><strong>Good try. Let’s look once more.</strong><p>${selected.check.hint}</p><button type="button" data-review-idea>Show the idea again</button></div>`; if (correct) { saveComplete(conceptKey()); renderConcepts(); } });
  lesson.addEventListener("click", event => { if (event.target.closest("[data-review-idea]")) lesson.querySelector(".maths-understand-card").scrollIntoView({ behavior: "smooth", block: "center" }); });
  lesson.querySelector("[data-next-concept]").addEventListener("click", () => moveConcept(1));
  lesson.querySelector("[data-previous-concept]").addEventListener("click", () => moveConcept(-1));
  lesson.querySelectorAll("[data-maths-listen]").forEach(button => {
    button.addEventListener("click", event => {
      if (!window.speechSynthesis) {
        lesson.querySelector("[data-audio-status]").textContent = "Audio is not supported in this browser.";
        return;
      }
      window.speechSynthesis.cancel();
      lesson.querySelectorAll("[data-maths-listen]").forEach(item => item.classList.remove("is-speaking"));
      const selected = currentConcept();
      const language = event.currentTarget.dataset.mathsListen;
      const isHindi = language === "hindi";
      const hindiText = hindiAudio[selected.title] || `इस पाठ में हम ${selected.title} को चित्र और आसान उदाहरण से समझेंगे।`;
      const text = isHindi
        ? `${selected.title}। ${hindiText}`
        : `${selected.title}. ${alternateShown ? selected.alternate : selected.explain}. Example. ${selected.exampleQuestion}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isHindi ? "hi-IN" : "en-IN";
      utterance.rate = isHindi ? 0.82 : 0.88;
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.lang.toLowerCase().startsWith(isHindi ? "hi" : "en-in"));
      if (preferredVoice) utterance.voice = preferredVoice;
      event.currentTarget.classList.add("is-speaking");
      lesson.querySelector("[data-audio-status]").textContent = isHindi ? "हिंदी में समझा रहे हैं…" : "Explaining in English…";
      utterance.onend = () => {
        event.currentTarget.classList.remove("is-speaking");
        lesson.querySelector("[data-audio-status]").textContent = isHindi ? "हिंदी explanation complete ✓" : "English explanation complete ✓";
      };
      utterance.onerror = () => {
        event.currentTarget.classList.remove("is-speaking");
        lesson.querySelector("[data-audio-status]").textContent = "Audio could not play. Please try again.";
      };
      window.speechSynthesis.speak(utterance);
    });
  });

  renderTopics();
})();
