import React, { useState } from 'react';
import './App.css';

const URLAPI = `https://testing-facerecog.herokuapp.com`



const App = () => {

  // eslint-disable-next-line
  const [data, setData] = useState(null)
  // const [data, setData2] = useState([])
  // const [data, setData3] = useState([])

  // eslint-disable-next-line
  const [image, setImage] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const [faceID1, setFaceID1] = useState(null);
  const [faceID2, setFaceID2] = useState(null);
  const [isIdentical, setIsIdentical] = useState(false);
  const [percent, setPercent] = useState(null);
  const [expression, setExpression] = useState(null);
  const [abc, setAbc] = useState(null);

  const handleOnChange = event => {
    setImage(event.target.value)
  }

  const handleOnChange2 = event => {
    setImage2(event.target.value)
  }

  const handleOnChange3 = event => {
    setImage3(event.target.value)
  }

  const handleOnChange4 = event => {
    setImage4(event.target.value)
  }

  const handleDetectImage = async event => {
    event.preventDefault();

    console.log('will click');

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
        })
      }
      const resp = await fetch(`${URLAPI}/create-facelist`, fetchOptions)
      const people = await resp.json()
      console.log("data of people: ", people.data);
      const emotionObject = people.data[0].faceAttributes.emotion;
      const emotionArray = Object.values(emotionObject);
      const indexEmoMax = Math.max(...emotionArray);
      setExpression({ info: getKeyByValue(emotionObject, indexEmoMax), percent: indexEmoMax });
      setData(people.data);
    } catch (err) {
      console.error(err.messsage);
    }
  }

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }
  const handleFaceIDs = async event => {
    event.preventDefault();

    console.log('will click');

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image2: image2,
        })
      }
      const resp = await fetch(`${URLAPI}/create-facelist2`, fetchOptions)
      const infoFaceID1 = await resp.json()
      console.log("data of face id 1: ", infoFaceID1.data[0].faceId);
      // Set faceID1
      setFaceID1(infoFaceID1.data[0].faceId);
    } catch (err) {
      console.error(err.messsage);
    }

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image3: image3,
        })
      }
      const resp = await fetch(`${URLAPI}/create-facelist3`, fetchOptions)
      const infoFaceID2 = await resp.json()
      console.log("data of face id 2: ", infoFaceID2.data[0].faceId);
      // Set faceID2
      setFaceID2(infoFaceID2.data[0].faceId);
    }
    catch (err) {
      console.error(err.messsage);
    }
  }

  const handleVerify = async event => {
    event.preventDefault();

    console.log('will click');

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          faceID1: faceID1,
          faceID2: faceID2
        })
      }
      const resp = await fetch(`${URLAPI}/create-facelist4`, fetchOptions)
      const infoVerify = await resp.json()
      console.log("data of verifying: ", infoVerify.data);
      setIsIdentical(infoVerify.data.isIdentical);
      setPercent(infoVerify.data.confidence.toFixed(2));
    } catch (err) {
      console.error(err.messsage);
    }
  }

  const handleIdentity = async event => {
    event.preventDefault();

    console.log('will click');

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image4: image4,
        })
      }
      const resp = await fetch(`${URLAPI}/create-facelist5`, fetchOptions)
      const infoIdentity = await resp.json()
      console.log("data of object identity: ", infoIdentity.data);
      
      setAbc(infoIdentity.data.description.captions[0].text);
      
      // setIsIdentical(infoVerify.data.isIdentical);
      // setPercent(infoVerify.data.confidence.toFixed(2));
    
    
    } catch (err) {
      console.error(err.messsage);
    }
  }

  //faceiD1, faceiD2
  return (
    <div className="App">
      <header className="App-header">
        <p>
          FACE DETECTION USING AZURE API
        </p>
        <p>
          1. Face detection and Attribute predictions
        </p>
        <div className="containerFile">
          <input
            className="inputFile"
            placeholder="Upload image"
            onChange={handleOnChange}
            value={image}
          />
          {image &&
            <button
              className="buttonFile"
              onClick={handleDetectImage}
            >
              Upload
          </button>
          }
        </div>
        {data &&
          <div>
            <h2 className="titleAtribute">Results: </h2>

            <ul>
              {
                data.map(item => (
                  <li key={item.faceId}>
                    <span>
                      Gender: {item.faceAttributes.gender}, age: {item.faceAttributes.age}
                      <p>Glasses: {item.faceAttributes.glasses}</p>
                      {expression && <p>Emotion: {expression.info} about {expression.percent.toFixed(2) * 100}%</p>}
                      <div className="b" style={{ top: `${item.faceRectangle.top + 412 + 203 * data.length}px`, left: `${item.faceRectangle.left + 40}px`, width: `${item.faceRectangle.width}px`, height: `${item.faceRectangle.height}px` }}></div>
                    </span>
                  </li>
                )
                )
              }
              <img src={image} alt={image} />
            </ul>

          </div>}
        <p>
          2. Veryifying 2 faces
        </p>
        <div className="containerFile">
          <input
            className="inputFile"
            placeholder="Upload image2"
            onChange={handleOnChange2}
            value={image2}
          />

          <input
            className="inputFile"
            placeholder="Upload image3"
            onChange={handleOnChange3}
            value={image3}
          />
          {image3 !== '' && image2 !== '' &&
            <button
              className="buttonFile"
              onClick={handleFaceIDs}
            >
              Upload
            </button>
          }

          {faceID2 && faceID1 &&
            <button
              className="buttonFile"
              onClick={handleVerify}
            >
              Verify
          </button>
          }
        </div>

        {percent &&
          <div>
            <p> The percentage is {percent * 100} %</p>
            {!isIdentical &&
              <p> They are not the same</p>
            }
            {isIdentical &&
              <p>They are the same</p>
            }
          </div>
        }
        <p>
        3. Object identity, tagging and description
        </p>
        <div className="containerFile">
          <input
            className="inputFile"
            placeholder="Upload image4"
            onChange={handleOnChange4}
            value={image4}
          />
          {image4 &&
            <button
              className="buttonFile"
              onClick={handleIdentity}
            >
              Upload
          </button>
          }
        </div>

        {abc &&
          <div>
            
            <p>Description: {abc}</p>
            <p>Tags: {}</p>
            <img src={image4} alt={image4} />
          </div>
        }
      </header>
    </div>
  );









}





export default App;



