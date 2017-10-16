import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = props => {
  return(
    <div>
      <div className='row'>
        <div className='small-11 small-centered columns'>
          <h1 className='text-center top-padded'>Port Katherine</h1>
          <ul className='menu align-center icons expanded'>
            <li>
              <Link to='/contact'>
                <h3><i className='fa fa-envelope' /><span>&nbsp;Contact</span></h3>
              </Link>
            </li>
            <li>
              <h3><a href='https://s3-us-west-2.amazonaws.com/portkatherine/rules/Port_Katherine_Rules_v1.0.pdf' target='_blank'>
                <i className='fa fa-book' /><span>&nbsp;Rules</span>
              </a></h3>
            </li>
            <li>
              <h3><Link to='/values'>
                <i className='fa fa-balance-scale' /><span>&nbsp;Values</span>
              </Link></h3>
            </li>
          </ul>
          <p>
            <strong>
              Port Katherine&nbsp;
            </strong>
            is an ongoing aetherpunk
            <strong>
              &nbsp;live action role playing game (LARP)&nbsp;
            </strong>
            that runs in New England. It has daring combat, devious politics,
            dreadful magic, dangerous monsters, and just about anything our
            players and staff can dream up. It is set in the fictional world
            of
            <strong>
              &nbsp;Lithos.
            </strong>
          </p>
          <p>
            In a roleplaying game, you take on the role of a
            <strong>
              &nbsp;player character (PC).&nbsp;
            </strong>
            &quot;Live action&quot; means the game is visceral and real:
            instead of sitting down at a table to just imagine your
            characte'’s actions (or watching them on a screen), you act them
            out yourself, within the rules of safe and engaging play. The
            rules are easy to learn, easy to use, and flexible.
          </p>
          <p>
            Roleplaying is more than just acting or pantomiming. It is
            <em>
              &nbsp;choice&nbsp;
            </em>
            and
            <em>
              &nbsp;agency:&nbsp;
            </em>
            while your actions are guided by your character and situation,
            you are not reading from a script. You decide what your does,
            what they think, and how they feel. You create your own character
            and play them at Port Katherine events, developing them further
            the more you play.
          </p>
          <p>
            There are many ways to play your character. Some people play to
            tell a story, or for drama and catharsis. Some play to live as
            another person, to get inside their head and think like they do.
            Some play for the challenge or competition. Some want to explore
            the world and its possibilities. Some play to spend some time
            outdoors, get exercise, wear a costume, or just have a lot of fun
            for the weekend&hellip;
          </p>
          <p>
            The game also has
            <strong>
              &nbsp;non-player characters (NPCs).&nbsp;
            </strong>
            They are under the guidance of or played by staff, who run
            events, develop plotlines, provide challenges, and play and
            interact within the game.
          </p>
          <p>
            Port Katherine runs 4 weekend-long events each year: 2 in the
            spring cycle and 2 in the fall cycle (Other LARPs usually refer
            to these as &quot;seasons&quot;. We do not, because seasons are
            an integral part of the Port Katherine setting and we wish to
            avoid confusion.) We occasionally run day-long special events in
            the summer and winter. The game is played at a campsite, mostly
            outdoors. No one under 18 years of age may play without staff
            permission.
          </p>
          <p>
            Port Katherine is a game about heroes. The characters exist at a
            certain time and in a certain place when momentous things are
            happening. Not all stories will operate on a cosmic scale, but
            the actions that each person takes will have meaning and can
            shape the world. Choices matter, and the future is yet unwritten.
          </p>
          <h5 className='text-center'>
            Set sail with us, discover your character’s true self, and leave
            your mark upon the Pan-Aetherium.
          </h5>
        </div>
      </div>
    </div>
  )
}

export default HomePage
