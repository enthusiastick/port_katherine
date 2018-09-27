import React from "react"
import { Link } from "react-router-dom"

import LodgingQuestionnaireLink from "../components/LodgingQuestionnaireLink"

const EventTile = props => {
  let linkTo = `/events/${props.slug}`
  let registerLink = `${linkTo}/register`
  let volunteerLink = `${linkTo}/volunteer`

  if (props.passes && props.passes.length > 0) {
    registerLink += `?pass=${props.passes[0].slug}`
  }

  if (props.userBooking) {
    const showLodgingQuestionnaire =
      props.showLodgingQuestionnaire &&
      props.userBooking.category === "player" &&
      !props.userBooking.lodgingQuestionnaireCompletedAt

    let dateClass

    if (!showLodgingQuestionnaire) {
      dateClass = "bottomless"
    }

    return (
      <div className="callout secondary" key={props.slug}>
        <div className="text-center">
          <h3>
            <Link to={linkTo}>
              {props.name}
              <span>
                &nbsp;<i className="fa fa-check" />
              </span>
            </Link>
          </h3>
          <p className={dateClass}>{props.dates}</p>
          {showLodgingQuestionnaire && (
            <LodgingQuestionnaireLink eventSlug={props.slug} />
          )}
        </div>
      </div>
    )
  }

  const callToAction = (
    <p className="bottomless">
      <strong>
        <Link className="button bottomless" to={volunteerLink}>
          Volunteer
        </Link>
        &nbsp;
        {!props["capped?"] && (
          <Link className="button bottomless" to={registerLink}>
            Register
          </Link>
        )}
      </strong>
    </p>
  );

  return (
    <div className="callout secondary" key={props.slug}>
      <div className="text-center">
        <h3>
          <Link to={linkTo}>{props.name}</Link>
        </h3>
        <p>{props.dates}</p>
        {props["registerable?"] && callToAction}
      </div>
    </div>
  )
}

export default EventTile
