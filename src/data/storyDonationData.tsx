import { IStory } from "@/types/IStory";
import DonationThumbnail1 from "@/assets/donate-thumbnail-1.jpg";
import DonationThumbnail2 from "@/assets/donate-thumbnail-2.jpg";
import DonationThumbnail3 from "@/assets/donate-thumbnail-3.jpg";

export const storyDonationData: IStory[] = [
  {
    id: "1",
    image: {
      src: DonationThumbnail1,
      col: 2,
      row: 3,
    },
    date: "June 27, 2023",
    author: "Clink James",
    title: "Flood in Lamboa! Flood in Lamboa!! Flood in Lamboa!!!",
    content: (
      <div>
        <p>
          Land of Hope Foundation Land of Hope Foundation Land of Hope
          Foundation Land of Hope Foundation Land of Hope Foundation Land of
          Hope Foundation Land of Hope Foundation Land of Hope Foundation
        </p>
        <br />
        <p>
          Land of Hope Foundation Land of Hope Foundation Land of Hope
          Foundation Land of Hope Foundation Land of Hope Foundation Land of
          Hope Foundation Land of Hope Foundation Land of Hope Foundation
        </p>
      </div>
    ),
    categoryName: "Disaster",
    categoryId: "1",
    analytics: {
      contributions: 230,
      percentage: 20,
    },
    url: "/",
  },
  {
    id: "2",
    image: {
      src: DonationThumbnail2,
      col: 2,
      row: 3,
    },
    date: "July 39, 2022",
    author: "Clink James",
    title: "Let’s Make Education For All",
    content: (
      <div>
        <p>
          <strong>About</strong>
        </p>
        <p>
          Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque
          reiciendis. Qui beatae vel magnam repudiandae ipsum repellat
          repudiandae. Voluptate at dolores ut dolor sint occaecati similique.
          Velit eius ab delectus temporibus. For dynamic content, add a rich
          text field to any collection and then connect a rich text element to
          that field in the settings panel. Headings, paragraphs, block-quotes,
          figures, images, and figure captions can all be styled.
        </p>
        <br />
        <p>
          <strong>Team</strong>
        </p>
        <p>
          Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque
          reiciendis. Qui beatae vel magnam repudiandae ipsum repellat
          repudiandae. Voluptate at dolores ut dolor sint occaecati similique.
          Velit eius ab delectus temporibus. For dynamic content, add a rich
          text field to any collection and then connect a rich text element to
          that field in the settings panel. Headings, paragraphs, block-quotes,
          figures, images, and figure captions can all be styled.
        </p>
      </div>
    ),
    categoryName: "Disaster",
    categoryId: "1",
    analytics: {
      contributions: 1099,
      percentage: 50,
      goal: 2000,
      attanied: 1000,
      outstanding: 1000,
      currency: "USD",
      countdown: 12,
    },
    url: "donate/",
  },
  {
    id: "3",
    image: {
      src: DonationThumbnail3,
    },
    date: "July 19, 2022",
    author: "Clink James",
    title: "Help African Children",
    content: (
      <div>
        <p>
          African children need your help to get proper food and water.
          Prolonged crisis is a real urgency. Emergency! A tsunami has just hit
          Malika, Tarasudi District. Help our affected brothers and sisters.
        </p>
        <br />
        <p>
          Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque
          reiciendis. Qui beatae vel magnam repudiandae ipsum repellat
          repudiandae. Voluptate at dolores ut dolor sint occaecati similique.
          Velit eius ab delectus temporibus. For dynamic content, add a rich
          text field to any collection and then connect a rich text element to
          that field in the settings panel. Headings, paragraphs, block-quotes,
          figures, images, and figure captions can all be styled.
        </p>
        <br />
        <br />
        <p>
          <strong>Reasons</strong>
        </p>
        <p>
          Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque
          reiciendis. Qui beatae vel magnam repudiandae ipsum repellat
          repudiandae. Voluptate at dolores ut dolor sint occaecati similique.
          Velit eius ab delectus temporibus. For dynamic content, add a rich
          text field to any collection and then connect a rich text element to
          that field in the settings panel. Headings, paragraphs, block-quotes,
          figures, images, and figure captions can all be styled.
        </p>
      </div>
    ),
    categoryName: "Children",
    categoryId: "2",
    analytics: {
      contributions: 748,
      percentage: 40,
      goal: 2500000,
      attanied: 1000000,
      currency: "NGN",
    },
    url: "/",
  },
  {
    id: "4",
    image: {
      src: DonationThumbnail2,
      col: 2,
      row: 3,
    },
    date: "July 30, 2022",
    author: "Clink James",
    title: "Sianka Forest Fire",
    content:
      "The Sianka forest has caught fire and affected the surrounding community. Let's help buy their health facilities! Emergency! A tsunami has just hit Malika, Tarasudi District. Help our affected brothers and sisters.",
    categoryName: "Children",
    categoryId: "2",
    analytics: {
      contributions: 748,
    },
    url: "/",
  },
  {
    id: "5",
    image: {
      src: DonationThumbnail3,
      col: 2,
      row: 3,
    },
    date: "Sept 1, 2023",
    title: "Soporo Earthquake",
    author: "Clink James",
    content:
      "A magnitude 7.3 earthquake has shaken Saporo sub-district, help them recover with food and medicine. Emergency! A tsunami has just hit Malika, Tarasudi District. Help our affected brothers and sisters.",
    categoryName: "Health",
    categoryId: "3",
    analytics: {
      contributions: 760,
    },
    url: "/",
  },
  {
    id: "6",
    image: {
      src: DonationThumbnail2,
      col: 2,
      row: 3,
    },
    date: "Sept 1, 2023",
    author: "Clink James",
    title: "Lidu Land Drought",
    content:
      "The people of Tanah Lidu are currently suffering from drought, help them get clean water! Emergency! A tsunami has just hit Malika, Tarasudi District. Help our affected brothers and sisters.",
    categoryName: "Pandemic",
    categoryId: "4",
    analytics: {
      contributions: 760,
    },
    url: "/",
  },
];
