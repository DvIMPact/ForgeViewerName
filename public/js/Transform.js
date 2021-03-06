
    /////////////////////////////////////////////////////////////
    // Gets input transform
    //
    /////////////////////////////////////////////////////////////
    function getScale() {

        var x = 1.0000
        var y = 1.0000
        var z = 1.0000
  
        return new THREE.Vector3(x, y, z);
      }
  
      function getTranslation() {
  
        var x = 0.00
        var y = 0.00
        var z = 0.00
  
        // x = isNaN(x) ? 0.0 : x;
        // y = isNaN(y) ? 0.0 : y;
        // z = isNaN(z) ? 0.0 : z;
  
        return new THREE.Vector3(x, y, z);
      }
  
      function getRotation() {
  
        var x = 0.00
        var y = 0.00
        var z = 0.00
  
        // x = isNaN(x) ? 0.0 : x;
        // y = isNaN(y) ? 0.0 : y;
        // z = isNaN(z) ? 0.0 : z;
  
        var euler = new THREE.Euler(
          x * Math.PI/180,
          y * Math.PI/180,
          z * Math.PI/180,
          'XYZ');
  
        var q = new THREE.Quaternion();
  
        q.setFromEuler(euler);
  
        return q;
      }
  
      function setTranslation(pointdata) {
  
        var x = pointdata.x;
        var y = pointdata.y;
        var z = pointdata.z;
  
        return new THREE.Vector3(x, y, z);
      }
  
      /////////////////////////////////////////////////////////////
      // Builds transform matrix
      //
      /////////////////////////////////////////////////////////////
      function buildTransformMatrix(points) {
        console.log('Im inside of transform', points);
        var t = setTranslation(points);
        var r = getRotation();
        var s = getScale();
        console.log('Value T', t);
        console.log('Value R', r);
        console.log('Value S', s);
  
        var m = new THREE.Matrix4();
        console.log('Change');
        m.compose(t, r, s);
        console.log('Return M ',m);
        return m;
      }
