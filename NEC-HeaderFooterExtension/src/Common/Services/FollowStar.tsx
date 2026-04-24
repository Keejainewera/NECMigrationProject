import * as React from 'react';
import { useEffect, useState } from 'react';
import { spfi, SPFI } from "@pnp/sp";
import { getSP } from "../../extensions/necHeader/loc/pnpjsConfig";
import "@pnp/sp/social";
import { SocialActorType } from "@pnp/sp/social";
import { IconButton } from '@fluentui/react/lib/Button';

export interface IFollowedSitesLinkProps {
  siteUrl: string;
}

const FollowStar: React.FC<IFollowedSitesLinkProps> = ({ siteUrl }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sp, setSp] = useState<SPFI>();
  const baseUrl = siteUrl?.replace(/\/$/, "");

  const openFollowSites = () => {
    // const tenantUrl = siteUrl.split("/sites")[0].replace(/\/$/, "");
    const url = `${baseUrl}/_layouts/15/sharepoint.aspx?v=sites`;

    window.open(url, "_blank", "noopener,noreferrer");
  };
  // useEffect(() => {
//    const init = async () => {
//   try {
   
//     const spInstance = getSP();
//     setSp(spInstance);

//     const actorInfo = {
//       ActorType: SocialActorType.Site,
//       ContentUri: siteUrl
//     };

//     const isFollowed = await spInstance.social.isFollowed(actorInfo);
//     setIsFollowing(isFollowed);
//   } catch (err) {
//     console.error("Error checking follow status", err);
//     setError("Failed to check follow status");
//   } finally {
//     setLoading(false);
//   }
// };

//     init();
    
  // }, [siteUrl]);

  // const toggleFollow = async () => {
  //   if (!sp) return;

  //   const actorInfo = {
  //     ActorType: SocialActorType.Site,
  //     ContentUri: siteUrl
  //   };

  //   try {
  //     if (isFollowing) {
  //       await sp.social.stopFollowing(actorInfo);
  //       setIsFollowing(false);
  //     } else {
  //       await sp.social.follow(actorInfo);
  //       setIsFollowing(true);
  //     }
  //   } catch (err) {
  //     console.error("Error toggling follow", err);
  //     setError("Failed to toggle follow");
  //   } 
  // };

 return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
     <a style={{ color: 'white',cursor: "pointer",textDecoration: "underline", }}
  onClick={openFollowSites}
>
  Follow Recent Sites
</a>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {/* {loading ? (
        <p style={{ color: 'white' }}>Loading follow status...</p>
      ) : (
        <>
          <IconButton
            iconProps={{ iconName: isFollowing ? 'FavoriteStarFill' : 'FavoriteStar' }}
            title={isFollowing ? 'Unfollow this site' : 'Follow this site'}
            ariaLabel={isFollowing ? 'Unfollow this site' : 'Follow this site'}
            onClick={toggleFollow}
            styles={{
              root: {
                color: isFollowing ? '#ffc83d' : 'white', // yellow when followed, white otherwise
                backgroundColor: 'transparent',
                fontSize: 20,
                padding: 0
              },
              rootHovered: {
                backgroundColor: 'transparent',
                color: isFollowing ? '#ffc83d' : 'white'
              },
              rootPressed: {
                backgroundColor: 'transparent',
                color: isFollowing ? '#ffc83d' : 'white'
              }
            }}
          />
          <span style={{ fontSize: 14, color: 'white' }}>
            {isFollowing ? 'Following' : 'Follow'}
          </span>
        </>
      )} */}
    </div>
  );
};

export default FollowStar;