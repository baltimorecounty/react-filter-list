import { FilterList } from "../src/index";
import React from "react";

const filters = [
 //  {
  //   targetApiField: "status",
  //   value:
  //     window.pets.petStatus ||
  //     console.error("You must provide a pets.petStatus.")
  // },

  // {
  //   targetApiField: "recordsPerPage",
  //   value: 10
  // },

//   {
//     targetApiField: "petType",
//     displayName: "Species",
//     options: [
//       { value: "dog", label: "Dog" },
//       { value: "cat", label: "Cat" },
//       { value: "other", label: "Other" }
//     ]
//   },
//   {
//     targetApiField: "gender",
//     displayName: "Gender",
//     options: [
//       { value: "male", label: "Male" },
//       { value: "female", label: "Female" },
//       { value: "unknown", label: "Unknown" }
//     ]
//   },
//   {
//     targetApiField: "weight",
//     displayName: "Size",
//     options: [
//       { value: "small", label: "Small" },
//       { value: "medium", label: "Medium" },
//       { value: "large", label: "Large" }
//     ]
//   }
// ];

//   {
//     targetApiField: "category.value",
//     displayName: "Category",
//     options: [
//       { value: "releases", label: "News Releases" },
//       { value: "Stories", label: "Stories" }
//     ],
//   }
// ];

//   targetApiField: "communities",
//   displayName: "Communities",
//   options: [
//     { label: "Arbutus", value: "arbutus " },
//     { label: "Baltimore Highlands", value: "baltimore-highlands " },
//     { label: "Bear Creek", value: "bear-creek " },
//     { label: "Bengies-Chase", value: "bengies-chase " },
//     { label: "Berkshire-Eastwood", value: "berkshire-eastwood " },
//     { label: "Carroll Manor", value: "carroll-manor " },
//     { label: "Catonsville", value: "catonsville " },
//     { label: "Cockeysville", value: "cockeysville " },
//     { label: "Cockeysville PAL", value: "cockeysville-pal " },
//     { label: "Colgate", value: "colgate " },
//     { label: "Dundalk PAL", value: "dundalk-pal " },
//     { label: "Dundalk-Eastfield", value: "dundalk-eastfield " },
//     { label: "Edgemere-Sparrows Point", value: "edgemere-sparrows-point " },
//     { label: "Edmondson-Westview", value: "edmondson-westview " },
//     { label: "Essex-Stembridge", value: "essex-stembridge " },
//     { label: "Gray Charles", value: "gray-charles " },
//     { label: "Greater Loch Raven", value: "greater-loch-raven " },
//     { label: "Hereford", value: "hereford " },
//     { label: "Hillendale PAL", value: "hillendale pal " },
//     { label: "Kingsville", value: "kingsville " },
//     { label: "Lansdowne PAL", value: "lansdowne-pal " },
//     { label: "Lansdowne-Riverview", value: "lansdowne-riverview " },
//     { label: "Liberty Road", value: "liberty-road " },
//     { label: "Loch Raven", value: "loch-raven " },
//     { label: "Lutherville - Timonium", value: "lutherville - timonium " },
//     { label: "Mars Estates PAL", value: "mars-estates-pal " },
//     { label: "Middle River", value: "middle-river " },
//     { label: "North Point Village", value: "north-point-village " },
//     { label: "Overlea-Fullerton", value: "overlea-fullerton " },
//     { label: "Owings Mills", value: "owings-mills " },
//     { label: "Parkville", value: "parkville " },
//     { label: "Perry Hall", value: "perry-hall " },
//     { label: "Pikesville", value: "pikesville " },
//     { label: "Prettyboy", value: "prettyboy " },
//     { label: "Reisterstown", value: "reisterstown " },
//     { label: "Rosedale", value: "rosedale " },
//     { label: "Scotts Branch PAL", value: "scotts-branch-pal " },
//     { label: "Shady Spring PAL", value: "shady-spring-pal " },
//     { label: "Towson", value: "towson " },
//     { label: "Towsontowne", value: "towsontowne " },
//     { label: "Turner Station", value: "turner-station " },
//     { label: "Watersedge", value: "watersedge " },
//     { label: "West Inverness", value: "west-inverness " },
//     { label: "White Marsh", value: "white-marsh " },
//     { label: "Winfield PAL", value: "winfield-pal " },
//     { label: "Woodlawn", value: "woodlawn " },
//     { label: "Woodmoor PAL", value: "woodmoor-pal" }
//   ],

// },
// {
//   targetApiField: "amenities",
//   displayName: "Amenities",
//   options: [
//     { label: "Activity Rooms", value: "activity-rooms" },
//     {
//       label: "Agricultural Resource Center",
//       value: "agricultural-resource-center"
//     },
//     { label: "Amphitheater", value: "amphitheater" },
//     { label: "Art Gallery", value: "art-gallery" },
//     { label: "Arts Center", value: "arts-center" },
//     { label: "Athletic Fields", value: "athletic-fields" },
//     { label: "Auditorium", value: "auditorium" },
//     { label: "Ball Diamonds", value: "ball-diamonds" },
//     { label: "Boat Ramps", value: "boat-ramps" },
//     { label: "Boat Rentals", value: "boat-rentals" },
//     { label: "Community Center", value: "community-center" },
//     { label: "Community Gardens", value: "community-gardens" },
//     { label: "Computer Lab", value: "computer-lab" },
//     { label: "Concert Bandshell", value: "concert-bandshell" },
//     { label: "Conference Center", value: "conference-center" },
//     { label: "Dog Park", value: "dog-park" },
//     { label: "Drones Permitted", value: "drones-permitted" },
//     { label: "Exhibits", value: "exhibits" },
//     { label: "Farmlands", value: "farmlands" },
//     { label: "Fishing Center", value: "fishing-center" },
//     { label: "Gazebo", value: "gazebo" },
//     { label: "Historic Site", value: "historic-site" },
//     { label: "Horseshoe Pits", value: "horseshoe-pits" },
//     { label: "Indoor Athletic Fields", value: "indoor-athletic-fields" },
//     {
//       label: "Indoor Multipurpose Courts",
//       value: "indoor-multipurpose-courts"
//     },
//     { label: "Indoor Pickleball Courts", value: "indoor-pickleball-courts" },
//     { label: "Indoor Pool", value: "indoor-pool" },
//     { label: "Indoor Soccer Arena", value: "indoor-soccer-arena" },
//     { label: "Indoor Tennis Courts", value: "indoor-tennis-courts" },
//     { label: "Indoor Track", value: "indoor-track" },
//     { label: "Interpretive Center", value: "interpretive-center" },
//     { label: "Interpretive Museum", value: "interpretive-museum" },
//     { label: "Lodge", value: "lodge" },
//     { label: "Meditative Labyrinth", value: "meditative-labyrinth" },
//     { label: "Meeting Rooms", value: "meeting-rooms" },
//     { label: "Multipurpose Courts", value: "multipurpose-courts" },
//     { label: "Museum", value: "museum" },
//     { label: "Natural Areas", value: "natural-areas" },
//     {
//       label: "Natural Rare Wild Bird Habitat",
//       value: "natural-rare-wild-bird-habitat"
//     },
//     { label: "Nature Center", value: "nature-center" },
//     { label: "Nature Trails", value: "nature-trails" },
//     {
//       label: "Outdoor Pickleball Courts",
//       value: "outdoor-pickleball-courts"
//     },
//     { label: "Paved Walking Paths", value: "paved-walking-paths" },
//     { label: "Pavilions", value: "pavilions" },
//     { label: "Picnic Areas", value: "picnic-areas" },
//     { label: "Piers", value: "piers" },
//     { label: "Playgrounds", value: "playgrounds" },
//     {
//       label: "Police Athletic League Center",
//       value: "police-athletic-league-center"
//     },
//     { label: "Pond-Lake", value: "pond-lake" },
//     {
//       label: "Recreation And Parks Office",
//       value: "recreation-and-parks-office"
//     },
//     {
//       label: "Recreation And Parks Regional Office",
//       value: "recreation-and-parks-regional-office"
//     },
//     { label: "Reflective Fountain", value: "reflective-fountain" },
//     { label: "Restrooms", value: "restrooms" },
//     { label: "Roller Hockey Court", value: "roller-hockey-court" },
//     { label: "Sand Volleyball Courts", value: "sand-volleyball-courts" },
//     { label: "Shoreline", value: "shoreline" },
//     { label: "Skate Park", value: "skate-park" },
//     { label: "Stage", value: "stage" },
//     { label: "Swimming", value: "swimming" },
//     { label: "Tennis Courts", value: "tennis-courts" },
//     {
//       label: "Therapeutic Recreation Office",
//       value: "therapeutic-recreation-office"
//     },
//     { label: "Tracks", value: "tracks" },
//     {
//       label: "Visual And Interactive Meditative Displays",
//       value: "visual-and-interactive meditative-displays "
//     }
//   ],
// },

// ];

//*******************************
//Add these back in if you need to test the weight and pet type interactions
// */
{
  targetApiField: "status",
  value: "Adoptable",
},

{
  targetApiField: "recordsPerPage",
  value: 10,
},
{
  targetApiField: "petType",
  displayName: "Species",
  options: [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "other", label: "Other" },
  ],
},
{
  targetApiField: "weight",
  displayName: "Size",
  options: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ],
},
];

const Demo = props => {
  return (
    <div className="demo">
      <FilterList
        title="News"
        filters={filters}
        apiEndpoint="https://localhost:44387/api/Pets?status=Adoptable"
        //apiEndpoint="https://localhost:44393/api/News/Police" 
       // apiEndpoint="https://localhost:44393/api/Parks"
        includeDateFilter={false}
        includeInputFilter={true}
        includeClearButton={true}
        searchCategory="Pets" //"Parks" 
        renderItem={({ title, articleSummary }) => (
          <div
            style={{
              border: "1px solid #e0e0e0",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h2>{title}</h2>
            <p>{articleSummary}</p>
          </div>
        )}
      />
    </div>
  );
};

export default Demo;
